import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize";

// 购买记录表
const sequelize: Sequelize = require('./index');

export const PurchaseLogDAO: ModelCtor<Model> = sequelize.define('purchaselog', {
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