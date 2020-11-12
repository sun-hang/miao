// 购买记录表
/**
 * 导入操作对象
 */
import { ShoppingCartDAOType } from '../dao/shoppingCartDAO';
import { PurchaseLogDAO } from '../dao/purchaseLogDAO';
import { UserAdminDAO } from '../dao/userAdminDAO';
import { ProductDAO } from '../dao/productDAO';
import { ProductDataDAO } from '../dao/productDataDAO';
import { optionQuery } from './commentSer';
import { UpdateOptions } from 'sequelize';

// 增
/**
 * 增加一个
 */
export const addOne = async (data: ShoppingCartDAOType): Promise<ShoppingCartDAOType> => {
    const result = await PurchaseLogDAO.create(data);
    return result.toJSON() as ShoppingCartDAOType;
}
/**
 * 增加多个
 */

export const addMore = async (datas: ShoppingCartDAOType[]): Promise<ShoppingCartDAOType[]> => {
    const result = await PurchaseLogDAO.bulkCreate(datas);
    return JSON.parse(JSON.stringify(result))
}

// 删
/**
 * 删除一个
 */
export const removeOne = async (id: number): Promise<number> => {
    const result = await PurchaseLogDAO.destroy({
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

export const updata = async (id: number, data = {}) => {
    const result = await PurchaseLogDAO.update(data, {
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
    const result = await PurchaseLogDAO.findAll({
        include: [ProductDAO, ProductDataDAO, UserAdminDAO]
    });
    return JSON.parse(JSON.stringify(result));
}
/**
 * 根据用户id
 */
export const findByUserId = async (useradminId: number): Promise<ShoppingCartDAOType[]> => {
    const result = await PurchaseLogDAO.findAll({
        include: [ProductDAO, ProductDataDAO, UserAdminDAO],
        where: {
            useradminId
        }
    });
    return JSON.parse(JSON.stringify(result));
}
/**
 * 根据id查询
 */

export const findById = async (id: number): Promise<ShoppingCartDAOType[]> => {
    const result = await PurchaseLogDAO.findAll({
        include: [ProductDAO, ProductDataDAO, UserAdminDAO],
        where: {
            id
        }
    });
    return JSON.parse(JSON.stringify(result));
}