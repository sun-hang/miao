import { RequestHandler, Response, Request, NextFunction } from 'express'
import { Model } from 'sequelize';
import { bidAdDAOType } from '../dao/bigAdDAO'
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

export interface getHandleInt<T> {
    (): Promise<T[]>
}

export interface putHandleInt {
    (id: number, data: any): Promise<[number, Model<any, any>[]]>
}

export const getHandler = async <T>(req: Request, res: Response, next: NextFunction, handle: getHandleInt<T>) => {
    const result = await handle();
    res.json(getResObj(200, "请求成功", result))
}

export const putHandler = async (req: Request, res: Response, next: NextFunction, handle: putHandleInt) => {
    const id = parseInt(req.params.id);
    if (!Object.is(NaN, id) || id != 0) {
        const result = await handle(id, req.body);
        res.json(getResObj(200, "修改成功", result))
    } else {
        res.json(getResObj(200, "id错误", null))
    }
}

export const delHandler = async (req:Request,res:Response,next:NextFunction) => {

}