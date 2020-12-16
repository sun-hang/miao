// 产品表
/**
 * 导入操作对象和数据类型接口
 */
import { Op } from 'sequelize';
import { ProductDAO, ProductDAOType } from '../dao/productDAO';

// 增

/**
 * 增加一个
 */
export const addOne = async (data: ProductDAOType): Promise<ProductDAOType> => {
    const result = await ProductDAO.create(data);
    return result.toJSON() as ProductDAOType;
}
/**
 * 增加多个
 */
export const addMore = async (datas: ProductDAOType[]): Promise<ProductDAOType[]> => {
    const result = await ProductDAO.bulkCreate(datas);
    return JSON.parse(JSON.stringify(result));
}
// 删

/**
 * 删除一个
 */
export const removeOne = async (id: number): Promise<number> => {
    const result = await ProductDAO.destroy({
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
        count += res;
    }))
    return count;
}

// 改

/**
 * 修改一个
 */

export const updata = async (id: number, data = {}) => {
    const result = await ProductDAO.update(data, {
        where: {
            id
        }
    })
    return result;
}

// 查

/**
 * 查询全部
 */
export const findAll = async (): Promise<ProductDAOType[]> => {
    const result = await ProductDAO.findAll();
    return JSON.parse(JSON.stringify(result));
}
/**
 * 查询一个根据id
 */
export const findById = async (id: number): Promise<ProductDAOType | null> => {
    const result = await ProductDAO.findByPk(id);
    if (result) {
        return result.toJSON() as ProductDAOType;
    }
    return null;
}
/**
 * 根据标签或者名字
 */
export const findByTagAndName = async (tag: string = '', name: string = ''): Promise<ProductDAOType[]> => {
    tag = '%' + tag + '%';
    name = '%' + name + '%';
    const result = await ProductDAO.findAll({
        where: {
            [Op.or]: [{
                tag: {
                    [Op.like]: tag
                }
            }, {
                productName: {
                    [Op.like]: name
                }
            }]
        }
    })
    return JSON.parse(JSON.stringify(result));
}
/**
 * 分页查询+标签
 */
export const findByPageAndTag = async (page: number = 1, size: number = 10, tag: string = '', start?: number, end?: number): Promise<{ count: number, rows: ProductDAOType[] }> => {
    let where: any = {};
    tag = '%' + tag + '%';
    if (start && end) {
        where[Op.and] = [
            {
                nowPrice: {
                    [Op.and]: {
                        [Op.gte]: start,
                        [Op.lte]: end
                    }
                }
            }, {
                tag: {
                    [Op.like]: tag
                }
            }
        ]
    } else if (start) {
        where[Op.and] = [
            {
                nowPrice: {
                    [Op.gte]: start
                }
            }, {
                tag: {
                    [Op.like]: tag
                }
            }
        ]
    } else {
        where.tag = { [Op.like]: tag }
    }

    const result = await ProductDAO.findAndCountAll({
        where,
        limit: size,
        offset: (page - 1) * size
    })
    return JSON.parse(JSON.stringify(result));
}
