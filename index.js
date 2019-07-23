// 文档
// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#babel-traverse
import fs from 'fs';
import glob from 'glob';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
const t = require('@babel/types');

const files = glob.sync("src/*.js", {
    nodir: true,
    matchBase: true,
});
// console.log(files);
files.forEach(filePath => {
    // console.log(filePath)
    const codeString = fs.readFileSync(filePath).toString();
    // console.log("codeString", codeString)
    const ast = parser.parse(codeString, {
        sourceFilename: 'index.js',
        allowImportExportEverywhere: true,
        sourceType: "module",
        plugins: ["jsx"]
    });
    // console.log("ast", ast)
    const visitor = {
        Identifier(path) {
            const { node } = path;
            console.log("node", node.name)
            if (node && node.name === 'log') {
                path.replaceWith(createMemberExpression());
                path.stop();
            }
        },
        enter(path) {
            if (path.node.leadingComments) {
                // console.log("comm", path.remove, path.replaceWith)
                path.node.leadingComments.forEach(i => {
                    i.value = '';
                });
            }
        },
        exit(path) {
            const { node } = path;
            // console.log("exit", node.type)
        }
    }
    traverse(ast, visitor);
    const output = generate(ast, {
        sourceRoot: "./build",
        sourceMaps: true,
        sourceFileName: "index.map.js"
    });
    // console.log(output)
    fs.writeFileSync('./build/index.js', output.code);
    fs.writeFileSync('./build/index.js.map', JSON.stringify(output.map));
});

function createMemberExpression() {
    return t.memberExpression(
        t.identifier('console'),
        t.identifier('log')
    );
}
