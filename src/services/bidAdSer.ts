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
export const addOne = async (bid: bidAdDAOType) => {
    const result = await BidAdDAO.create(bid);
    if (result) {
        return result.toJSON();
    }
    return null;
}
/**
 * 增加多个
 */
export const addMore = async (bid: bidAdDAOType[]) => {
    const result = await BidAdDAO.bulkCreate(bid);
    if (result) {
        // 是数组
        return result
    }
    return [];
}
// 删
/**
 * 删除一个
 */
export const removeOne = async (id: number) => {
    const result = await BidAdDAO.destroy({
        where: {
            id
        }
    })
    if (result) {
        return result;
    } else {
        return null;
    }
}
/**
 * 删除多个
 */
export const removeMore = async (ids: number[]) => {
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
    if (result) {
        return result
    }
    return null;
}
// 查

/**
 * 查询所有
 */
export const findAll = async () => {
    const result = await BidAdDAO.findAll();
    if (result.length != 0) {
        return result;
    }
    return null;
}
/**
 * 查询id
 */
export const findById = async (id: number) => {
    const result = await BidAdDAO.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
}

// 查询最新一条

export const findByNewOne = async () => {
    const result = await BidAdDAO.findAll({
        limit:1,
        offset:0,
        order:[['id',"DESC"]]
    })
    if(result.length != 0){
        return result[0].toJSON();
    }
    return null;
}