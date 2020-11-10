// 购物车表
/**
 * 导入操作对象和数据类型接口
 */
import { UpdateOptions } from 'sequelize';
import { ProductDAO } from '../dao/productDAO';
import { ProductDataDAO } from '../dao/productDataDAO';
import { ShoppingCartDAO, ShoppingCartDAOType } from '../dao/shoppingCartDAO';
import { UserAdminDAO } from '../dao/userAdminDAO';

// 增
/**
 * 增加一个
 */
export const addOne = async (data: ShoppingCartDAOType): Promise<ShoppingCartDAOType> => {
    const result = await ShoppingCartDAO.create(data);
    return result.toJSON() as ShoppingCartDAOType;
}
/**
 * 增加多个
 */
export const addMore = async (datas: ShoppingCartDAOType[]): Promise<ShoppingCartDAOType[]> => {
    const result = await ShoppingCartDAO.bulkCreate(datas);
    return JSON.parse(JSON.stringify(result))
}

// 删
/**
 * 删除一个
 */
export const removeOne = async (id: number): Promise<number> => {
    const result = await ShoppingCartDAO.destroy({
        where: {
            id
        }
    })
    return result
}
/**
 * 删除多个
 */

export const removeMore = async (ids: number[]): Promise<number> => {
    let count = 0;
    await Promise.all(ids.map(async (item, index) => {
        const res = await removeOne(item);
    }))
    return count;
}

// 改
/**
 * 修改一个
 */

export const update = async (id: number, option: UpdateOptions<ShoppingCartDAOType>) => {
    const result = await ShoppingCartDAO.update(option, {
        where: {
            id
        }
    })
    return result;
}

// 查

/**
 * 查询所有
 */
export const findAll = async (): Promise<ShoppingCartDAOType[]> => {
    const result = await ShoppingCartDAO.findAll({
        include: [ProductDAO, ProductDataDAO, UserAdminDAO]
    });
    return JSON.parse(JSON.stringify(result));
}
/**
 * 根据id查询
 */
export const findById = async (id: number): Promise<ShoppingCartDAOType[]> => {
    const result = await ShoppingCartDAO.findAll({
        include: [ProductDAO, ProductDataDAO, UserAdminDAO],
        where: {
            id
        }
    });
    return JSON.parse(JSON.stringify(result));
}
/**
 * 倒叙查询第一条
 */
export const findDesc = async (): Promise<ShoppingCartDAOType[]> => {
    const result = await ShoppingCartDAO.findAll({
        include: [ProductDAO, ProductDataDAO, UserAdminDAO],
        limit: 1,
        offset: 0,
        order: [["id", "DESC"]]
    })
    return JSON.parse(JSON.stringify(result))
}