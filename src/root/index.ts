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
    origin(origin, cd) {
        cd(null, true)
    },
    credentials: true,
    methods:['GET','POST']
}))

// 解析cookie中间件
app.use(cookies());

// session中间件
app.use(session({
    secret: "ssflovefmm",
    cookie: {
        maxAge: 60 * 1000 * 60 * 24 * 7,
        httpOnly: false
    },
    name: "sessionid"
}));


app.use(require('./tokenMiddleware').default)

// 图片防盗链
app.use(require('./imgMiddleware').default);

// 静态文件中间件
app.use(exporess.static(rootPath));

// 解析json格式数据
app.use(exporess.json());

// 解析表单格式
app.use(exporess.urlencoded({
    extended: true
}))

// 解析文本格式
app.use(exporess.text());

// 验证码
app.use('/api/captcha', require('./api/captchaApi').default)

// 首屏大广告处理路由
app.use('/api/bigad', require('./api/bigAdApi').default)

// 首屏大图的处理路由
app.use('/api/bigpic', require('./api/bigPicApi').default)

// 评论处理路由
app.use('/api/comment', require('./api/commentApi').default);

// 用户处理路由
app.use('/api/user', require('./api/userAdminApi').default);

// 卖家用户处理路由
app.use('/api/myuser', require('./api/myAdminApi').default)

// 下载处理路由
app.use('/api/download', require('./api/downloadFile').default);

// 新闻处理路由
app.use('/api/news', require('./api/newsApi').default)

// 产品处理路由
app.use('/api/product', require('./api/productApi').default);

// 产品数据处理路由
app.use('/api/productdata', require('./api/productDataApi').default);

// 购物记录处理路由
app.use('/api/purchaselog', require('./api/purchaseLogApi').default);

// 购物车处理路由
app.use('/api/shoppingcart', require('./api/shoppingCartApi').default)

// 首页小广告处理路由
app.use('/api/smallad', require('./api/smallAdApi').default)

// 上传文件处理路由
app.use('/api/updata', require('./api/updataFileApi').default)

// 用户地址处理路由
app.use('/api/useraddress', require('./api/userAddressApi').default);

// 错误处理中间件
app.use(require('./errorMiddleware').default)

// 开始监听
app.listen(9527, () => {
    console.log("开始监听9527端口");
})

