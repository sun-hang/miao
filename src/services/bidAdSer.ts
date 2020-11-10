// 首页首屏大广告
/**
 * 导入操作对象和类型接口
 */
import { BidAdDAO, bidAdDAOType } from '../dao/bigAdDAO';

// 要导出各种方法进行数据库操作

// 增

/**
 * 增加一个
 */
export const addOne = async (bid: bidAdDAOType): Promise<bidAdDAOType> => {
    const result = await BidAdDAO.create(bid);
    return result.toJSON() as bidAdDAOType;
}
/**
 * 增加多个
 */
export const addMore = async (bid: bidAdDAOType[]): Promise<bidAdDAOType[]> => {
    const result = await BidAdDAO.bulkCreate(bid);
    if (result) {
        // 是数组
        return JSON.parse(JSON.stringify(result))
    }
    return [];
}
// 删
/**
 * 删除一个
 */
export const removeOne = async (id: number): Promise<number> => {
    const result = await BidAdDAO.destroy({
        where: {
            id
        }
    })
    return result;
}
/**
 * 删除多个
 */
export const removeMore = async (ids: number[]): Promise<number> => {
    let count = 0;
    // 全部
    await Promise.all(ids.map(async (item, index) => {
        let res = await removeOne(item);
        if (res !== null) {
            count += res;
        }
    }))
    // 全部执行完毕就返回
    return count;
}

// 改

/**
 * 改一个
 */
export const upData = async (data: object, id: number) => {
    const result = await BidAdDAO.update(data, {
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
export const findAll = async (): Promise<bidAdDAOType[]> => {
    const result = await BidAdDAO.findAll();
    return JSON.parse(JSON.stringify(result)) as bidAdDAOType[];
}
/**
 * 查询id
 */
export const findById = async (id: number): Promise<bidAdDAOType | null> => {
    const result = await BidAdDAO.findByPk(id);
    if (result) {
        return result.toJSON() as bidAdDAOType;
    }
    return null;
}

// 查询最新一条

export const findByNewOne = async (): Promise<bidAdDAOType[]> => {
    const result = await BidAdDAO.findAll({
        limit: 1,
        offset: 0,
        order: [['id', "DESC"]]
    })
    return JSON.parse(JSON.stringify(result));
}