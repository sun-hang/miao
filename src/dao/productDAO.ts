import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize";

// 产品表
const sequelize: Sequelize = require('./index');

export interface ProductDAOType {
    readonly [k: string]: any
    productName: string
    originalPrice: number
    nowPrice: number
    listImgSrc: string
    adImgSrc: string
    synopsis: string
    synopsisImgSrc: string
    tag: string
    // productDataId: number
    detail?: string
}

export const ProductDAO: ModelCtor<Model> = sequelize.define('product', {
    // 产品名称
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 原价
    originalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // 现价
    nowPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // 广告展示地址，多个可以是视频
    listImgSrc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 列表展示图片地址
    adImgSrc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 产品简介
    synopsis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 产品下方详情介绍图
    synopsisImgSrc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // // 产品详情数据外键表id
    // productDataId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // 产品详情文本
    detail: {
        type: DataTypes.TEXT
    }
}, {
    updatedAt: false,
    createdAt: false,
    paranoid: true
})