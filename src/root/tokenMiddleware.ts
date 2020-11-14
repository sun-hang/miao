import { NextFunction, Request, Response } from "express";
import path from 'path';
const whiteList = ['/', '/index.html', '/api/user/login', '/api/user/logon', '/api/myuser/login'];
export default async (req: Request, res: Response, next: NextFunction) => {
    if (whiteList.includes(req.url) || path.extname(req.url)) {
        console.log('11111')
        next();
        return;
    }
    // res.redirect('/')
    res.json({mag:"请登录"})
}
