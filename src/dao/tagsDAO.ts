import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize";
const sequelize: Sequelize = require('./index');

export interface tagsDAOType {
    name: string
}

export const TagDAO: ModelCtor<Model> = sequelize.define("tag", {
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