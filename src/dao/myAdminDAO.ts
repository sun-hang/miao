import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize";
// 卖家用户表
const sequelize: Sequelize = require('./index');
export interface myAdminDAOType {
    loginUser: string
    loginPassword: string
    email?: string
    ctime: string
}
export const MyAdminDAO: ModelCtor<Model> = sequelize.define("myadmin", {
    // 用户名
    loginUser: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 密码
    loginPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 邮箱
    email: {
        type: DataTypes.STRING
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