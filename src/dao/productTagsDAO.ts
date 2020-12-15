import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize";
const sequelize: Sequelize = require('./index');

export interface productTagsDAOType {
    name: string
}

export const ProductTagsDAO: ModelCtor<Model> = sequelize.define("producttag", {
    // 标题
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    updatedAt: false,
    createdAt: false,
    paranoid: true,
})