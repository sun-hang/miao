import exporess = require("express");
import cookies from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
const app: exporess.Application = exporess();

import path = require("path");

// 静态文件根目录
const rootPath = path.resolve('', './public');

// 跨域处理
app.use(cors({
    origin: "*"
}))

// 静态文件中间件
app.use(exporess.static(rootPath));

// 解析cookie中间件
app.use(cookies());

// session中间件
app.use(session({
    secret: "ssflovefmm",
    cookie: {
        maxAge: 60 * 1000 * 60 * 24 * 7,
    },
    name: "sessionid"
}));

// 解析json格式数据
app.use(exporess.json());

// 解析表单格式
app.use(exporess.urlencoded({
    extended: true
}))

// 解析文本格式
app.use(exporess.text());

// 首屏大广告处理路由
app.use('/api/bigad', require('./api/bidAdApi').default)

// 首屏大图的处理路由
app.use('/api/bigpic', require('./api/bigPicApi').default)

// 评论处理路由
app.use('/api/comment', require('./api/commentApi').default);

// 用户处理路由
app.use('/api/user', require('./api/userAdminApi').default);

// 错误处理中间件
app.use(require('./errorMiddleware').default)

// 开始监听
app.listen(9527, () => {
    console.log("开始监听9527端口");
})

