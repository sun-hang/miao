// 首屏大图
/**
 * 导入操作对象和数据类型接口
 */

import { BigPicDAO, bigPicDAOType } from '../dao/bigPicDAO';

// 增

/**
 * 增加一个
 */
export const addOne = async (data: bigPicDAOType): Promise<bigPicDAOType> => {
    const result = await BigPicDAO.create(data);
    return result.toJSON() as bigPicDAOType;
}
/**
 * 增加多个
 */
export const addMore = async (datas: bigPicDAOType[]): Promise<bigPicDAOType[]> => {
    const result = await BigPicDAO.bulkCreate(datas);
    return JSON.parse(JSON.stringify(result));
}

// 刪

/**
 * 删除一个
 */
export const removeOne = async (id: number): Promise<number> => {
    const result = await BigPicDAO.destroy({
        where: {
            id
        }
    });
    return result;
}
/**
 * 删除多个
 */

export const removeMore = async (ids: number[]): Promise<number> => {
    let count = 0;
    await Promise.all(ids.map(async (item, index) => {
        const res = await removeOne(item);
        count += res;
    }))
    return count;
}

// 改
/**
 * 修改
 */

export const update = async (id: number, data = {}) => {
    const result = await BigPicDAO.update(data, {
        where: {
            id
        }
    });
    return result;
}

// 查
/**
 * 查询所有
 */
export const findAll = async (): Promise<bigPicDAOType[]> => {
    const result = await BigPicDAO.findAll();
    return JSON.parse(JSON.stringify(result));
}
/**
* 查询一个
*/
export const findById = async (id: number): Promise<bigPicDAOType | null> => {
    const result = await BigPicDAO.findByPk(id);
    if (result) {
        return result.toJSON() as bigPicDAOType;
    }
    return null;
}
/**
 * 查询最新一条
 */
export const findByNewOne = async (): Promise<bigPicDAOType[]> => {
    const result = await BigPicDAO.findAll({
        limit: 1,
        offset: 0,
        order: [['id', 'DESC']]
    })
    return JSON.parse(JSON.stringify(result));
}