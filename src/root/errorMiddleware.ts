import { RequestParamHandler, Request, Response, NextFunction } from 'express';

class HttpException extends Error {
    constructor(public status: number, public message: string, public errors: any = {}) {
        super(message);
    }
}

export default function (err: HttpException, req: Request, res: Response, next: NextFunction) {
    if (err) {
        res.status(500).send({
            status: 500,
            message: err.message
        })
    } else {
        console.log(err);
        res.send({ msg: "nihao" })
    }

}