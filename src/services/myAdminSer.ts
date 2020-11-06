// 卖家用户表
import { Partial } from 'sequelize';
/**
 * 导入操作对象和数据类型接口
 */
import { MyAdminDAO, myAdminDAOType } from '../dao/myAdminDAO';

// 增
/**
 * 增加一个
 */
export const addOne = async (option: myAdminDAOType) => {
    const result = await MyAdminDAO.create(option);
    return result;
}

// 删
/**
 * 删除一个
 */

export const removeOne = async (id: number) => {
    const result = await MyAdminDAO.destroy({
        where: {
            id
        }
    })
    return result;
}

/**
 * 删除多个
 */
export const removeMore = async (ids: number[]) => {
    let count = 0;
    await Promise.all(ids.map(async (item, index) => {
        const result = await removeOne(item);
        count += result;
    }))

    return count;
}

// 改
/**
 * 修改一个
 */
export const updata = async (id: number, data: any = {}) => {
    const result = await MyAdminDAO.update(data, {
        where: {
            id
        }
    })

    return result;
}

// 查

/**
 * 根据id查一个
 */


/**
 * 查询所有
 */


/**
 * 根据姓名查一个
 */

