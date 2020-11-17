import { RequestHandler, Response, Request, NextFunction } from 'express'
import { Model } from 'sequelize';
import { bidAdDAOType } from '../dao/bigAdDAO'
export interface ResObjType {
    status: number
    msg: string
    data: any
}

// 获取所有数据的帮助函数接口
export interface getHandleInt<T> {
    (): Promise<T[]>
}

// 修改数据的帮助函数接口
export interface putHandleInt {
    (id: number, data: any): Promise<[number, Model<any, any>[]]>
}

// 删除一个数据的帮助函数接口
export interface delHandleInt {
    (id: number): Promise<number>
}

// 删除多个数据的帮助函数接口
export interface delMoreHandleInt {
    (id: number[]): Promise<number>
}

// 获取单个数据帮助函数接口
export interface getIdHandleInt<T> {
    (id: number): Promise<T | null>
}

export interface postAllHandleInt<T> {
    (data: T[]): Promise<T[]>
}
export interface postHandleInt<T> {
    (data: T): Promise<T>
}
export interface verifyInt<T> {
    (item: T, keys: string[]): string | boolean
}

// 返回对象函数
export const getResObj = (status: number, msg: string, data: any = {}): ResObjType => {
    const result: ResObjType = {
        status,
        msg,
        data
    }
    return result;
}


// 获取所有数据的函数
export const getHandler = async <T>(req: Request, res: Response, next: NextFunction, handle: getHandleInt<T>) => {
    const result = await handle();
    res.json(getResObj(200, "请求成功", result))
}

// 修改一个数据的函数
export const putHandler = async (req: Request, res: Response, next: NextFunction, handle: putHandleInt) => {
    const id = parseInt(req.params.id);
    if (!Object.is(NaN, id) || id != 0) {
        const result = await handle(id, req.body);
        res.json(getResObj(200, "修改成功", result))
    } else {
        res.json(getResObj(200, "id错误", null))
    }
}

// 删除一个数据的函数
export const delHandler = async (req: Request, res: Response, next: NextFunction, handle: delHandleInt) => {
    let id = parseInt(req.params.id);
    if (!Object.is(NaN, id) && id > 0) {
        const result = await handle(id);
        res.json(getResObj(200, "删除成功", result));
    } else {
        res.json(getResObj(200, "id非数字或id不在取值范围", null))
    }
}

// 删除多个数据的函数
export const delMoreHandler = async (req: Request, res: Response, next: NextFunction, handle: delMoreHandleInt) => {
    let ids = req.body.data;
    if (Array.isArray(ids)) {
        let data = ids.filter((item) => {
            return typeof item === 'number' && !Object.is(NaN, item) && item > 0
        })
        let result = await handle(data);
        res.json(getResObj(200, "删除成功", result));
    } else {
        res.json(getResObj(200, "数据格式错误，请传递一个data的数字数组", null))
    }
}

// 获取单个数据函数
export const getIdHandler = async <T>(req: Request, res: Response, next: NextFunction, handle: getIdHandleInt<T>) => {
    let id = parseInt(req.params.id);
    if (id > 0 && !Object.is(NaN, id)) {
        let result = await handle(id);
        res.json(getResObj(200, "请求成功", result));
    } else {
        res.json(getResObj(200, "id非数字或数值越界或不存在", null))
    }
}

export const postHandler = async <T>(req: Request, res: Response, next: NextFunction, handle: postHandleInt<T>, handleAll: postAllHandleInt<T>, verify: verifyInt<T>, keys: string[]) => {
    let data = req.body.data;
    // 添加多个
    if (Array.isArray(data)) {
        data = data.filter((item) => {
            return !verify(item, keys);
        })
        const result = await handleAll(data);
        res.json(getResObj(200, "添加成功", result));
        return
    }
    data = req.body;

    // 添加一个
    let flag = verify(data, keys);
    console.log(flag);
    if (!flag) {
        let result = await handle(data);
        res.json(getResObj(200, "添加成功", result));
    } else {
        res.json(getResObj(200, flag as string, null))
    }
}