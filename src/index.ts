require('./dao/init');
require('./root/index');

import { combineTableNames } from 'sequelize/types/lib/utils';
import * as bigad from './services/bigAdSer';
import { bidAdDAOType } from './dao/bigAdDAO'
import { findAll, findByName, findOne } from './services/userAdminSer'
import { UserAdminDAO } from './dao/userAdminDAO'
// bigad.addOne({ title: "这是标题", content: "这是内容", synopsis: "这是简介", imgsrc: '这是图片链接' }).then(res => {
//     console.log(res); 
// })

//bigad.addMore([{ title: "这是标题", content: "这是内容", synopsis: "这是简介", imgsrc: '这是图片链接' },{ title: "这是标题", content: "这是内容", synopsis: "这是简介", imgsrc: '这是图片链接' }])

//  bigad.upData({title:"这是1号标题"},1).then(res =>{
//      console.log(res);
//  });
bigad.findAll().then((res) => {
    res.forEach(item => {
        console.log(item.title)
    });
})


// findAll().then(res => {
//     console.log(res, '成功')
// }, (error) => {
//     console.log(error, '失败')
// })

// bigad.findById(1).then(res =>{
//     console.log(res)
// })
// bigad.findByNewOne().then(res =>{
//     console.log(res);
// })

// bigad.removeOne(4);
// bigad.removeMore([3,2]).then(res =>{
//     console.log(res);
// })