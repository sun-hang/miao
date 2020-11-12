// 产品详情数据表
/**
 * 导入操作对象和数据类型接口
 */
import { ProductDataDAO, ProductDataDAOType } from '../dao/productDataDAO';
import { ProductDAO } from '../dao/productDAO';
// 增

/**
 * 增加一个
 */
export const addOne = async (data: ProductDataDAOType): Promise<ProductDataDAOType> => {
    const result = await ProductDataDAO.create(data);
    return result.toJSON() as ProductDataDAOType;
}
/**
 * 增加多个
 */
export const addMore = async (datas: ProductDataDAOType[]): Promise<ProductDataDAOType[]> => {
    const result = await ProductDataDAO.bulkCreate(datas);
    return JSON.parse(JSON.stringify(result));
}
// 删

/**
 * 删除一个
 */
export const removeOne = async (id: number): Promise<number> => {
    const result = await ProductDataDAO.destroy({
        where: {
            id
        }
    });
    return result;
}
/**
 * 删除多个
 */
export const removeMore = async (ids: number[]): Promise<number> => {
    let count = 0;
    await Promise.all(ids.map(async (item, index) => {
        const res = await removeOne(item);
        count += res;
    }))
    return count;
}
// 改
/**
 * 修改一个
 */

export const updata = async (id: number, data = {}) => {
    const result = await ProductDataDAO.update(data, {
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
export const findAll = async (): Promise<ProductDataDAOType[]> => {
    const result = await ProductDataDAO.findAll({
        include: [ProductDAO]
    });
    return JSON.parse(JSON.stringify(result));
}
/**
 * 根据产品id查询
 */
export const findProductId = async (productId: number): Promise<ProductDataDAOType[]> => {
    const result = await ProductDataDAO.findAll({
        include: [ProductDAO],
        where: {
            productId
        }
    })
    return JSON.parse(JSON.stringify(result));
}
/**
 * 根据id查询数据
 */
export const findById = async (id: number): Promise<ProductDataDAOType | null> => {
    const result = await ProductDataDAO.findByPk(id, {
        include: [ProductDAO]
    })
    if (result) {
        return result.toJSON() as ProductDataDAOType;
    }
    return null;
}   