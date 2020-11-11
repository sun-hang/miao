import { Model, ModelCtor, Sequelize } from "sequelize";
import { DataTypes } from 'sequelize';
// 大图广告表

/**
 * 首屏大广告的对象类型
 */
export interface bidAdDAOType {
    title: string
    content: string
    synopsis: string
    imgsrc: string
    id?: number,
    deletedAt?: string | null
}

/**
 * 导出首屏大广告的操作对象
 */
const sequelize: Sequelize = require('./index');
export const BidAdDAO: ModelCtor<Model> = sequelize.define("bigad", {
    //  标题
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 内容
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 介绍
    synopsis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 图片地址
    imgsrc: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    updatedAt: false,
    createdAt: false,
    paranoid: true,
    indexes: [{
        name: '_id',
        fields: [{ name: "id", order: "DESC" }],
        using: "BTREE"
    }]
});



