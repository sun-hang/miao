import { RequestHandler, Response, Request, NextFunction } from 'express'

export interface ResObjType {
    status: number
    msg: string
    data: any
}

export const getResObj = (status: number, msg: string, data: any = {}): ResObjType => {
    const result: ResObjType = {
        status,
        msg,
        data
    }
    return result;
}

export const getHandler = async (req: Request, res: Response, next: NextFunction, handle: Function) => {
    const result = await handle();
    res.json(getResObj(200, "请求成功", result))
}