// 用户地址表
/**
 * 导入操作对象和数据类型接口
 */
import { UserAddressDAO, UserAddressDAOType } from '../dao/userAddressDAO';
import { UserAdminDAO } from '../dao/userAdminDAO'
// 增
/**
 * 增加一个
 */
export const addOne = async (option: UserAddressDAOType): Promise<UserAddressDAOType> => {
    const result = await UserAddressDAO.create(option);
    return result.toJSON() as UserAddressDAOType;
}
/**
 * 增加多个
 */

export const addMore = async (options: UserAddressDAOType[]): Promise<UserAddressDAOType[]> => {
    const result = await UserAddressDAO.bulkCreate(options);
    return JSON.parse(JSON.stringify(result));
}

// 删
/**
 * 删除一个
 */

export const removeOne = async (id: number): Promise<number> => {
    const result = await UserAddressDAO.destroy({
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
    const result = await UserAddressDAO.update(data, {
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

export const findOne = async (id: number): Promise<UserAddressDAOType | null> => {
    const result = await UserAddressDAO.findByPk(id, {
        include: [UserAdminDAO]
    });
    if (result) {
        return result.toJSON() as UserAddressDAOType;
    }
    return null
}

/**
 * 查询所有
 */
export const findAll = async (): Promise<UserAddressDAOType[]> => {
    const result = await UserAddressDAO.findAll({
        include: [UserAdminDAO]
    });
    return JSON.parse(JSON.stringify(result));
}

/**
 * 根据用户id进行查询
 */

export const findByUserId = async (useradminId: number): Promise<UserAddressDAOType[]> => {
    const result = await UserAddressDAO.findAll({
        where: {
            useradminId
        },
        include: [UserAdminDAO]
    })
    return JSON.parse(JSON.stringify(result));
}