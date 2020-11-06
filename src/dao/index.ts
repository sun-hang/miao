// 主文件
import {Sequelize} from 'sequelize';

module.exports = new Sequelize('miao',"root","root",{
    host:"127.0.0.1",
    port:3306,
    dialect:"mysql",
    logging:(msg)=>{
        // console.log(msg)
    }
});

