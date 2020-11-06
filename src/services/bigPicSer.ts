// 首屏大图
/**
 * 导入操作对象和数据类型接口
 */
import { BigPicDAO, bigPicDAOType } from '../dao/bigPicDAO';

// 增

/**
 * 增加一个
 */
export const addOne = async (data: bigPicDAOType) => {
    const result = await BigPicDAO.create(data);
    if (result) {
        return result.toJSON();
    }
    return null;
}
/**
 * 增加多个
 */
export const addMore = async (datas: bigPicDAOType[]) => {
    const result = await BigPicDAO.bulkCreate(datas);
    if (result.length > 0) {
        return result;
    }
    return [];
}

// 刪

/**
 * 删除一个
 */
export const removeOne = async (id: number) => {
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

export const removeMore = async (ids: number[]) => {
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
export const findAll = async () => {
    return await BigPicDAO.findAll();
}
/**
* 查询一个
*/
export const findById = async (id: number) => {
    return await BigPicDAO.findByPk(id);
}
/**
 * 查询最新一条
 */
export const findByNewOne = async () => {
    const result = await BigPicDAO.findAll({
        limit: 1,
        offset: 0,
        order: "DESC"
    })
}