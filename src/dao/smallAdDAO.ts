// 小图广告表

import { Model, ModelCtor, Sequelize,DataTypes } from "sequelize";
const sequelize: Sequelize = require('./index');

/**
 * 导出首屏小广告的对象类型
 */
export interface smallAdDAOType {
    title: string
    content: string
    imgsrc: string
    price: number
    mintitle: string
    id?: number
    deletedAt: string | null
}

/**
 * 导出首屏小广告操作对象
 */
export const SmallAdDAO: ModelCtor<Model> = sequelize.define("smallad", {
    //    标题
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 内容
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 图片地址
    imgsrc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 价格
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // 小标题
    mintitle: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    updatedAt: false,
    createdAt: false,
    paranoid: true,
    indexes: [{
        name: "_id",
        using: "BTREE",
        fields: [{ name: "id", order: "DESC" }]
    }]
})