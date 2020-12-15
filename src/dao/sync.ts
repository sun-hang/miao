import { Sequelize } from "sequelize";
// 首页首屏大广告
require('./bigAdDAO');
// 首屏大图
require('./bigPicDAO');
// 评论表
require('./commentDAO');
// 卖家用户表
require('./myAdminDAO');
// 新闻表
require('./newsDAO');
// 产品表
require('./productDAO');
// 产品详情数据表
require('./productDataDAO');
// 购物记录表
require('./purchaseLogDAO');
// 购物车表
require('./shoppingCartDAO');
// 首页首屏小广告
require('./smallAdDAO');
// 用户地址表
require('./userAddressDAO');
// 用户表 
require('./userAdminDAO');
// 标签列表表
require('./productTagsDao');
// 产品标签页
require('./tagsDao');

const sequelize: Sequelize = require('./index');

sequelize.sync({
    alter: true
});

// 进行设置外键
require('./key');