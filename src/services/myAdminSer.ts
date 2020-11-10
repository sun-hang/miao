// 卖家用户表
/**
 * 导入操作对象和数据类型接口
 */
import { MyAdminDAO, myAdminDAOType } from '../dao/myAdminDAO';

// 增
/**
 * 增加一个
 */
export const addOne = async (option: myAdminDAOType): Promise<myAdminDAOType> => {
    const result = await MyAdminDAO.create(option);
    return result.toJSON() as myAdminDAOType;
}

// 删
/**
 * 删除一个
 */

export const removeOne = async (id: number): Promise<number> => {
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
export const removeMore = async (ids: number[]): Promise<number> => {
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
export const findOne = async (id: number):Promise<myAdminDAOType|null> => {
    const result = await MyAdminDAO.findByPk(id);
    if (result) {
        return result.toJSON() as myAdminDAOType;
    }
    return null;
}

/**
 * 查询所有
 */

export const findAll = async ():Promise<myAdminDAOType[]> => {
    const result = await MyAdminDAO.findAll();
    return JSON.parse(JSON.stringify(result));
}

/**
 * 根据姓名查一个
 */

export const findByName = async (name: string):Promise<myAdminDAOType[]> => {
    const result = await MyAdminDAO.findAll({
        where: {
            loginUser: name
        }
    })
    return JSON.parse(JSON.stringify(result));
}
