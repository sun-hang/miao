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