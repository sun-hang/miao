// 评论表
/**
 * 导入评论操作对象和数据类型接口
 */
import { CommentDAO, commentDAOType } from '../dao/commentDAO';
import { ProductDAO } from '../dao/productDAO';
import { UserAdminDAO } from '../dao/userAdminDAO';

// 增

/**
 * 增加一个
 */
export const addOne = async (data: commentDAOType): Promise<commentDAOType> => {
    const result = await CommentDAO.create(data);
    return result.toJSON() as commentDAOType;
}
/**
 * 增加多个
 */
export const addMore = async (datas: commentDAOType[]): Promise<commentDAOType[]> => {
    const result = await CommentDAO.bulkCreate(datas);
    return JSON.parse(JSON.stringify(result));
}
// 删

/**
 * 删除一个
 */
export const removeOne = async (id: number): Promise<number> => {
    const result = await CommentDAO.destroy({
        where: {
            id
        }
    });
    return result;
}
/**
 * 删除多个
 */

export const removeMore = async (data: number[]): Promise<number> => {
    let count = 0;
    await Promise.all(data.map(async (item, index) => {
        let res = await removeOne(item);
        count += res
    }))
    return count;
}

// 改

/**
 * 修改一个
 */

export const updata = async (id: number, data = {}) => {
    const result = await CommentDAO.update(data, {
        where: {
            id
        }
    })
    return result;
}

// 查

/**
 * 查询单条
 */
export const findOne = async (id: number): Promise<commentDAOType | null> => {
    const result = await CommentDAO.findByPk(id, {
        include: [ProductDAO, UserAdminDAO]
    });
    if (result) {
        return result.toJSON() as commentDAOType;
    }
    return null;
}
/**
 * 查询所有 需要产品id
 */
export const findAll = async (productid: number): Promise<commentDAOType[]> => {
    const result = await CommentDAO.findAll({
        where: {
            productid
        },
        include: [ProductDAO, UserAdminDAO]
    });
    return JSON.parse(JSON.stringify(result));
}
/**
 * 根据id倒叙查询
 */
export const findDESC = async (id: number): Promise<commentDAOType[]> => {
    const result = await CommentDAO.findAll({
        where: {
            id
        },
        order: "DESC",
        include: [ProductDAO, UserAdminDAO]
    });
    return JSON.parse(JSON.stringify(result));
}
/**
 * 分页查询
 */
export const findByPage = async (id: number, page: number = 1, size: number = 10): Promise<{ rows: commentDAOType[], count: number }> => {
    const result = await CommentDAO.findAndCountAll({
        where: {
            id
        },
        include: [ProductDAO, UserAdminDAO],
        limit: size,
        offset: (page - 1) * size
    });
    return JSON.parse(JSON.stringify(result));
}
/**
 * 自定义查询
 */
export const optionQuery = async (option: { where?: any }): Promise<{ rows: commentDAOType[], count: number }> => {
    const result = await CommentDAO.findAndCountAll(option);
    return JSON.parse(JSON.stringify(result));
}