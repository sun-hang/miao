import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize";

// 购物车表
const sequelize: Sequelize = require('./index');

// 导出购物车表的数据结构类型
export interface ShoppingCartDAOType {
    userId: number
    productId: number
    productDataId: number
    number: number
    remarks: string
}
/**
 * 导出购物车表的操作对象
 */
export const ShoppingCartDAO: ModelCtor<Model> = sequelize.define('shoppingcart', {
    // 用户id
    // userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // 产品id
    // productId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // 产品详情id
    // productDataId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // 数量
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // 备注
    remarks: {
        type: DataTypes.STRING
    }
}, {
    updatedAt: false,
    createdAt: false,
    paranoid: true
});
