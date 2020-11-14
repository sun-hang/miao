import path from 'path';
import { Request, Response, NextFunction } from 'express'
import url from 'url';
export default (req: Request, res: Response, next: NextFunction) => {
    const extName = path.extname(req.path);
    let referer = req.headers.referer || '';
    const origin = req.headers.host || '';
    console.log(req.headers);
    if (!['.jpg', '.png', '.jpeg', '.gif'].includes(extName)) {
        next();
        return
    }
    if (referer) {
        referer = url.parse(referer).host ? url.parse(referer).host as string: '';
    }
    if (referer && origin !== referer) {
        req.url = '/img/1.jpg'
    }
    next()
}