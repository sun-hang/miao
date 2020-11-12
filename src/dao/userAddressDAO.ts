import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize";

// 用户地址表
const sequelize: Sequelize = require('./index');

export interface UserAddressDAOType {
    [key: string]: any
    userId: number //用户id
    province: string //所在省份
    city: string    //所在城市
    area: string    //所在区县
    detail: string  //详细地址
    name: string    //收件人姓名
    email?: string  //用户邮箱地址
    phone: string   //用户手机号
}

export const UserAddressDAO: ModelCtor<Model> = sequelize.define('useraddress', {
    // 用户id
    // userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // 所在省份
    province: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 所在城市
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 所在区县
    area: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 详细地址
    detail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 收件人姓名
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 邮箱地址
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 联系人手机号
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    updatedAt: false,
    createdAt: false,
    paranoid: true
});