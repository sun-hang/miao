// 主文件
import {Sequelize} from 'sequelize';
let pass = "root";
module.exports = new Sequelize('miao',"root",pass,{
    host:"127.0.0.1",
    port:3306,
    dialect:"mysql",
    logging:(msg)=>{
        // console.log(msg)
    }
});

