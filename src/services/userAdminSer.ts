// 用户表

/**
 * 导入用户操作对象和数据类型接口
 */
import { UserAdminDAO, userAdminDAOType } from '../dao/userAdminDAO';

// 增
/**
 * 增加一个
 */
export const addOne = async (option: userAdminDAOType): Promise<userAdminDAOType> => {
    const result = await UserAdminDAO.create(option);
    return result.toJSON() as userAdminDAOType;
}
/**
 * 增加多个
 */

export const addMore = async (options: userAdminDAOType[]): Promise<userAdminDAOType[]> => {
    const result = await UserAdminDAO.bulkCreate(options);
    return JSON.parse(JSON.stringify(result));
}

// 删
/**
 * 删除一个
 */

export const removeOne = async (id: number): Promise<number> => {
    const result = await UserAdminDAO.destroy({
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
    const result = await UserAdminDAO.update(data, {
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

export const findOne = async (id: number): Promise<userAdminDAOType | null> => {
    const result = await UserAdminDAO.findByPk(id);
    if (result) {
        return result.toJSON() as userAdminDAOType;
    }
    return null
}

/**
 * 查询所有
 */
export const findAll = async (): Promise<userAdminDAOType[]> => {
    const result = await UserAdminDAO.findAll();
    return JSON.parse(JSON.stringify(result));
}

/**
 * 查询用户名
 */

export const findByName = async (name: string): Promise<userAdminDAOType[]> => {
    const result = await UserAdminDAO.findAll({
        where: {
            loginUser: name
        }
    })
    return JSON.parse(JSON.stringify(result));
}   