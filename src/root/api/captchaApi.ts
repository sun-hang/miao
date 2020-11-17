import svgCaptcha from 'svg-captcha';
import { Router, Request, Response, NextFunction } from 'express';

const router: Router = Router();

router.get('/', async (req, res, next) => {
    const captcha = svgCaptcha.create({
        size: 6,
        ignoreChars: '0oOiI1l',
        noise: 4,
        color: true
    })

    const session: any = req.session;
    session.captcha = captcha.text.toLowerCase();
    req.session = session;
    res.type('svg').status(200).send(captcha.data);
})

export function validateCaptcha(req: Request, res: Response, next: NextFunction) {
    const reqCaptcha = req.body.captcha ? req.body.captcha.toLowerCase() : "";
    const session: any = req.session
    if (reqCaptcha !== session.captcha) {
        res.json({ code: 401, mas: '验证码错误' })
    } else {
        next()
    }
    session.captcha = '';
    req.session = session;
}

export default router;