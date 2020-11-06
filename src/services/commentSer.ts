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
export const addOne = async (data: commentDAOType) => {
    const result = await CommentDAO.create(data);
    return result;
}
/**
 * 增加多个
 */
export const addMore = async (datas: commentDAOType[]) => {
    const result = await CommentDAO.bulkCreate(datas);
    return result;
}
// 删

/**
 * 删除一个
 */
export const removeOne = async (id: number) => {
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

export const removeMore = async (data: number[]) => {
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
export const findOne = async (id: number) => {
    const result = await CommentDAO.findByPk(id, {
        include: [ProductDAO, UserAdminDAO]
    });
    return result;
}
/**
 * 查询所有 需要产品id
 */
export const findAll = async (productid: number) => {
    const result = await CommentDAO.findAll({
        where: {
            productid
        },
        include: [ProductDAO, UserAdminDAO]
    });
    return result;
}
/**
 * 根据id倒叙查询
 */
export const findDESC = async (id: number) => {
    const result = await CommentDAO.findAll({
        where: {
            id
        },
        order: "DESC",
        include: [ProductDAO, UserAdminDAO]
    });
}
/**
 * 分页查询
 */
export const findByPage = async (id: number, page: number = 1, size: number = 10) => {
    const result = await CommentDAO.findAndCountAll({
        where: {
            id
        },
        include: [ProductDAO, UserAdminDAO],
        limit: size,
        offset: (page - 1) * size
    });
    return result;
}
/**
 * 自定义查询
 */
export const optionQuery = async (option: { where?: any }) => {
    const result = await CommentDAO.findAndCountAll(option);
    return result;
}