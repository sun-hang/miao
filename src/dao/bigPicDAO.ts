// 主页大图
import { Model, ModelCtor, Sequelize,DataTypes } from "sequelize";
const sequelize: Sequelize = require('./index');

/**
 * 导出主页大图的对象类型
 */
export interface bigPicDAOType {
    imgsrc: string
}

/**
 * 导出主页大图操作对象
 */
export const BigPicDAO: ModelCtor<Model> = sequelize.define("bigpic", {
    // 图片地址
    imgsrc: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    updatedAt: false,
    createdAt: false,
    paranoid: true
})