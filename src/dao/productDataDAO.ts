import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize";

// 产品详情数据表
const sequelize: Sequelize = require('./index');

export interface ProductDataDAOType {
    [key: string]: any
    productId: number
    text: string
    bidImgSrc: string
    smallImgSrc: string
    price: number
}

export const ProductDataDAO: ModelCtor<Model> = sequelize.define("productdata", {
    // 产品id
    // productId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // 显示文本
    text: {
        type: DataTypes.STRING
    },
    // 展示大图
    bidImgSrc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 展示小图
    smallImgSrc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 显示价格
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    updatedAt: false,
    createdAt: false,
    paranoid: true
});
