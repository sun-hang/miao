// 新闻表
/**
 * 导入操作对象和数据类型接口
 */
import { FindAndCountOptions } from 'sequelize';
import { NewsDAO, newsDAOType } from '../dao/newsDAO';

// 增
/**
 * 增加一个
 */
export const addOne = async (option: newsDAOType): Promise<newsDAOType> => {
    const result = await NewsDAO.create(option);
    return result.toJSON() as newsDAOType;
}
/**
 * 增加多个
 */

export const addMore = async (options: newsDAOType[]): Promise<newsDAOType[]> => {
    const result = await NewsDAO.bulkCreate(options);
    return JSON.parse(JSON.stringify(result));
}

// 删
/**
 * 删除一个
 */

export const removeOne = async (id: number): Promise<number> => {
    const result = await NewsDAO.destroy({
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
    const result = await NewsDAO.update(data, {
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

export const findOne = async (id: number): Promise<newsDAOType | null> => {
    const result = await NewsDAO.findByPk(id);
    if (result) {
        return result.toJSON() as newsDAOType;
    }
    return null
}

/**
 * 查询所有
 */
export const findAll = async (): Promise<newsDAOType[]> => {
    const result = await NewsDAO.findAll();
    return JSON.parse(JSON.stringify(result));
}
/**
 * 根据标签进行查询
 */
export const findTag = async (tag: string): Promise<newsDAOType[]> => {
    const result = await NewsDAO.findAll({
        where: {
            tag
        }
    })
    return JSON.parse(JSON.stringify(result));
}
/**
 * 分页查询
 */
export const findByPage = async (page: number = 1, size: number = 10, tag?: string): Promise<{ count: number, rows: newsDAOType[] }> => {
    const where: any = {};
    if (tag) {
        where.tag = tag;
    }
    const result = await NewsDAO.findAndCountAll({
        limit: size,
        offset: (page - 1) * size,
        where
    })
    return JSON.parse(JSON.stringify(result));
}
/**
 * 自定义查询
 */
export const autoQuery = async (option: FindAndCountOptions): Promise<{ count: number, rows: newsDAOType[] }> => {
    const result = await NewsDAO.findAndCountAll(option);
    return JSON.parse(JSON.stringify(result));
}
