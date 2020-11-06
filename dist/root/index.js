"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exporess = require("express");
const app = exporess();
app.listen(9527, () => {
    console.log("开始监听9527端口");
});
