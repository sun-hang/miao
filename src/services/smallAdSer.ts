// 首页首屏大广告
/**
 * 导入操作对象和数据类型接口
 */
import { SmallAdDAO, smallAdDAOType } from '../dao/smallAdDAO';
// 增
/**
 * 增加一个
 */
export const addOne = async (option: smallAdDAOType): Promise<smallAdDAOType> => {
    const result = await SmallAdDAO.create(option);
    return result.toJSON() as smallAdDAOType;
}
/**
 * 增加多个
 */

export const addMore = async (options: smallAdDAOType[]): Promise<smallAdDAOType[]> => {
    const result = await SmallAdDAO.bulkCreate(options);
    return JSON.parse(JSON.stringify(result));
}

// 删
/**
 * 删除一个
 */

export const removeOne = async (id: number): Promise<number> => {
    const result = await SmallAdDAO.destroy({
        where: {
            id
        }
    })
    return result;
}

/**
 * 删除多个
 */

export const removeMore = async (datas: number[]): Promise<number> => {
    let count = 0;
    await Promise.all(datas.map(async (item, index) => {
        const res = await removeOne(item);
        count += res;
    }))
    return count;
}

// 改
/**
 *
 */

export const updata = async (id: number, data = {}) => {
    const result = await SmallAdDAO.update(data, {
        where: {
            id
        }
    })
    return result;
}

// 查
/**
 * 根据id进行查询
 */

export const findOne = async (id: number): Promise<smallAdDAOType | null> => {
    const result = await SmallAdDAO.findByPk(id);
    if (result) {
        return result.toJSON() as smallAdDAOType;
    }
    return null
}

/**
 * 查询所有
 */
export const findAll = async (): Promise<smallAdDAOType[]> => {
    const result = await SmallAdDAO.findAll();
    return JSON.parse(JSON.stringify(result));
}

/**
 * 倒叙查询第一条
 */
export const findDesc = async (): Promise<smallAdDAOType[]> => {
    const result = await SmallAdDAO.findAll({
        limit: 1,
        offset: 0,
        order: [["id", "DESC"]]
    })
    return JSON.parse(JSON.stringify(result))
}