import { Model, ModelCtor, Sequelize,DataTypes } from "sequelize";
// 评论广告表
const sequelize: Sequelize = require('./index');
export interface commentDAOType {
    userid?: number
    username?: string
    content: string
    imgs: string
    productid?: number | null
    ctime: string
    id?: number
    deletedAt: string | null
}
export const CommentDAO: ModelCtor<Model> = sequelize.define('comment', {
    // 用户id
    // userid: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // 用户名
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 评论内容
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 评论图片，多个
    imgs: {
        type: DataTypes.TEXT
    },
    // 产品id
    // productid: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // 回复父级id
    parentid: {
        type: DataTypes.INTEGER
    },
    // 创建时间
    ctime: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    updatedAt: false,
    createdAt: false,
    paranoid: true
}) 