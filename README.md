
通过babel分析AST，然后对注释进行删减

## 几个关键步骤点
1. 这个visitor里面的方法是有顺序的
```js
vistor: {
    entry(path):{},
    // 节点名称
    VariableDeclaration(path){},
    CallExpression(path){},
    exit(path){}
}
```
2. sourcemap存储为字符串

```js
fs.writeFileSync('./build/index.js.map', JSON.stringify(output.map));
```
