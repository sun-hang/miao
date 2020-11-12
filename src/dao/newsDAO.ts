import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize";

// 新闻表
const sequelize: Sequelize = require('./index');

export interface newsDAOType {
    title: string
    userid?: number
    ctime: string
    content: string
    tag: string
    imgsrc: string
    synopsis: string
}

export const NewsDAO: ModelCtor<Model> = sequelize.define("news", {
    // 标题
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // // 用户id
    // userid: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // 创建时间
    ctime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 主要内容
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // 标签分类
    tag: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 图片地址
    imgsrc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 简介内容
    synopsis: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    updatedAt: false,
    createdAt: false,
    paranoid: true,
    indexes: [{
        name: "_ctime",
        using: "BTREE",
        fields: [{ name: "ctime", order: "DESC" }]
    }]
})