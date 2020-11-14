import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const secrect = "hangaimiao";
const cookieKey = 'jwtToken';
export const publish = async (res: Response, maxAge: number = 1000 * 60 * 60 * 24, info: object = {}) => {
    const token = jwt.sign(info, secrect, {
        expiresIn: maxAge
    });
    res.cookie(cookieKey, token, {
        maxAge: maxAge,
        httpOnly: true
    })
    res.header('authorization', token)
}

export const verify = async (req: Request) => {
    let token: string = req.cookies[cookieKey];
    if (!token) {
        token = req.headers.authorization ? req.headers.authorization : '';
        if (!token) {
            return null;
        }
    }
    let tokens = token.split(' ');
    token = tokens.length > 1 ? tokens[1] : tokens[0];
    try {
        let result = jwt.verify(token, secrect);
        return result;
    } catch (error) {
        return null;
    }
}