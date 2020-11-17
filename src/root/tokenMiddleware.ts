import { NextFunction, Request, Response } from "express";
import path from 'path';
import { ne } from "sequelize/types/lib/operators";
import { verify } from "./jwt";
const whiteList = ['/', '/index.html', '/admin/index.html', '/api/user/login', '/api/user/logon', '/api/myuser/login','/api/captcha','/api/myuser/whoami'];
const userWhiteList = ['/api/user'];

/**
 * 
 * @param item 
 * @param pathname  返回true 数组内没有满足条件的
 */
function verifyPath(item: string[], pathname: string): boolean {
    let len = item.filter(i => {
        return pathname.startsWith(i);
    })
    return len.length === 0;
}

// 通过之后return 否则会报错
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
        if (req.method == "POST" && (req.url === '/api/myuser' || req.url === '/api/user')) {
            next()
            return;
        }
    }

    // 有就是买家登录
    if (token) {
        let okWhiteList = ['/api/comment', '/api/purchaselog', '/api/shoppingcart', '/api/useraddress', '/api/user'];
        let noWhiteList = ['/api/bigad', '/api/bigpic', '/api/news', '/api/product', '/api/productdata', '/api/smallad'];
        // 不能获取所有用户  不能获取超级用户 可以添加地址，上传只能等于/api/updata/images
        // 可以写一个判断的，但太多了，可读性差，可扩展性差
        //如果路径是超级用户开头的路径不许通过，如果请求放法是POST路径是/api/updata/images 可以通过 
        // 如果是get请求并且路径等于/api/user 不能通过 普通用户无权获取所有用户列表
        // 黑名单不能通过
        // 如果是put和delete请求post，可以请求的白名单路径包含的话可以通过  verifPath判断ok白名单需要筛选len大于1，大于返回false 所以此处要取反
        if (req.method === 'GET' && !verifyPath(noWhiteList, req.url)) {
            next()
            return
        }
        if ((!(req.method == "GET" && req.url == '/api/user')) && ((req.method === 'PUT' || req.method == "DELETE" || req.method == "POST") && verifyPath(noWhiteList, req.url)) && !verifyPath(okWhiteList, req.url) && (!req.url.startsWith('/api/myuser') || (req.method == 'POST' && req.url === '/api/updata/images'))) {
            next();
            return
        }
    }
    // 所有都不符合，重定向到首页  之后可能会改
    res.redirect('/');
}
