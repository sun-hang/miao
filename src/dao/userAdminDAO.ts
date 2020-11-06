
import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize';

// 买家用户表
const sequelize: Sequelize = require('./index');

export interface userAdminDAOType {
    loginUser: string
    loginPassword: string
    email?: string
    imgsrc: string
    sex: boolean,
    phone: string
}

export const UserAdminDAO: ModelCtor<Model> = sequelize.define('useradmin', {
    // 用户名
    loginUser: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 用户密码
    loginPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 用户邮箱
    email: {
        type: DataTypes.STRING
    },
    // 头像地址
    imgsrc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 性别
    sex: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    // 手机号码
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    updatedAt: false,
    deletedAt: false,
    paranoid: true
})