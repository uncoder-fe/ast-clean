
通过babel分析AST，然后对注释进行删减

## 几个关键步骤点
1. 
```js
vistor: {
    entry(path):{},
    // 节点名称
    VariableDeclaration(path){},
    CallExpression(path){},
    exit(path){}
}
```
2. 

```js
fs.writeFileSync('./build/index.js.map', JSON.stringify(output.map));
```
