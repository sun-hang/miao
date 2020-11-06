//进行外键绑定
import { UserAdminDAO } from './userAdminDAO'; //用户表
import { UserAddressDAO } from './userAddressDAO'; //用户地址表
import { ProductDAO } from './productDAO'; //产品表
import { ProductDataDAO } from './productDataDAO'; //产品详情数据表
import { CommentDAO } from './commentDAO'; //评论表
import { ShoppingCartDAO } from './shoppingCartDAO'; //购物车表
import { PurchaseLogDAO } from './purchaseLogDAO'; //购物记录表
import { NewsDAO } from './newsDAO'; //新闻表

/**
 * 用户和用户地址进行关联
 */
UserAdminDAO.hasMany(UserAddressDAO);
UserAddressDAO.belongsTo(UserAdminDAO);

/**
 * 产品表和产品数据表进行关联
 */
ProductDAO.hasMany(ProductDataDAO);
ProductDataDAO.belongsTo(ProductDAO);
/**
 * 评论表和用户表进行关联
 */
UserAdminDAO.hasMany(CommentDAO);
CommentDAO.belongsTo(UserAdminDAO);
/**
 * 评论表和产品表进行关联
 */
ProductDAO.hasMany(CommentDAO);
CommentDAO.belongsTo(ProductDAO);
/**
 * 购物车表和产品表进行关联
 */
ShoppingCartDAO.belongsTo(ProductDAO);
ProductDAO.hasMany(ShoppingCartDAO);
/**
 * 购物车和用户表进行关联
 */
UserAdminDAO.hasMany(ShoppingCartDAO);
ShoppingCartDAO.belongsTo(UserAdminDAO);
/**
 * 购物车和产品详情数据表进行关联
 */
ProductDataDAO.hasMany(ShoppingCartDAO);
ShoppingCartDAO.belongsTo(ProductDataDAO);
/**
 * 购买记录表和用户表进行关联
 */
UserAdminDAO.hasMany(PurchaseLogDAO);
PurchaseLogDAO.belongsTo(UserAdminDAO);
/**
 * 购买记录表和产品表进行关联
 */
ProductDAO.hasMany(PurchaseLogDAO);
PurchaseLogDAO.belongsTo(ProductDAO);
/**
 * 购买记录表和产品详情数据表进行关联
 */
ProductDataDAO.hasMany(PurchaseLogDAO);
PurchaseLogDAO.belongsTo(ProductDataDAO);

