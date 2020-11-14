import { NextFunction, Request, Response } from "express";
import path from 'path';
import { verify } from "./jwt";
const whiteList = ['/', '/index.html', '/admin/index.html', '/api/user/login', '/api/user/logon', '/api/myuser/login'];
const userWhiteList = ['/api/user'];
export default async (req: Request, res: Response, next: NextFunction) => {
    if ((whiteList.includes(req.url) || path.extname(req.url) && (req.method !== 'DELETE' && req.method !== "PUT"))) {
        next();
        return;
    }
    let session: any = req.session;
    let token = verify(req);

    // 卖家用户登录开放所有权限
    if (session.myUser) {
        next();
        return;
    }

    // 超级用户未登录并且访问路径为后台页面，重定向到后台首页
    if (req.url.startsWith('/admin') && !session.myUser) {
        res.redirect('/admin/index.html');
        return;
    }

    // 超级用户和普通用户都没登陆
    if (!session.myUser && !token) {
        let noWhiteList = ['/api/comment', '/api/purchaselog', '/api/shoppingcart']
        // 没登陆，必须是get请求，不能是获取用户，卖家用户路径，获取所有评论，购物记录所有，购物车所有，用户地址所有
        // 购物记录可能有问题，应该都不能看，但还没改
        if (req.method === "GET" && !req.url.startsWith('/api/myuser') && !req.url.startsWith('/api/user') && !req.url.startsWith('/api/useraddress') && !noWhiteList.includes(req.url)) {
            next()
            return;
        }
    }

    // 有就是买家登录
    if (token) {
        let okWhiteList = ['/api/comment', '/api/purchaselog', '/api/shoppingcart']
        // 不能获取所有用户  不能获取超级用户
        if ((req.method === 'PUT' || req.method == "DELETE") && (req.url.startsWith('/api/comment') || req.url.startsWith('/api/purchaselog') || req.url.startsWith('/api/shoppingcart'))) {
            next();
        }
        if (
            !(req.method === "GET" && req.url === '/api/user') &&
            !req.url.startsWith('/api/myuser')
        ) {

        }
    }
    // 所有都不符合，重定向到首页  之后可能会改
    res.redirect('/');
}
