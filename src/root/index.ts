import exporess = require("express");
const app: exporess.Application = exporess();
import path = require("path");
const rootPath =  path.resolve('','./public');
console.log(rootPath)
app.use(exporess.static(rootPath))
app.listen(9527,()=>{
    console.log("开始监听9527端口")
})

