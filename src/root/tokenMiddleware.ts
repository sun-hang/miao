import { NextFunction, Request, Response } from "express";
import path from 'path';
import { verify } from "./jwt";
const whiteList = ['/', '/index.html', '/api/user/login', '/api/user/logon', '/api/myuser/login'];
export default async (req: Request, res: Response, next: NextFunction) => {
    if (whiteList.includes(req.url) || path.extname(req.url)) {
        console.log('11111')
        next();
        return;
    }
    let session: any = req.session;

    // 有的就是卖家登录
    if (session.myuser) {
        console.log(session.myuser);
    }

    let token = verify(req);

    // 有就是买家登录
    if (token) {
        console.log(token);
    }


    res.json({ mag: "请登录" })
}
