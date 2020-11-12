import { Router } from 'express';
import { bidAdDAOType } from '../../dao/bigAdDAO';
import { findByNewOne, findById, findAll, addOne, upData, removeOne, removeMore, addMore } from '../../services/bigAdSer'

import { getResObj, getHandler, putHandler, delHandler, delMoreHandler, getIdHandler, postHandler } from '../util'
const router: Router = Router();

/**
 * 查询最新的一条
 */
router.get('/new', async (req, res, next) => {
    let result = await findByNewOne();
    res.json(getResObj(200, "请求成功", result));
})

/**
 * 根据id进行查询
 */
router.get('/:id', async (req, res, next) => {
    await getIdHandler<bidAdDAOType>(req, res, next, findById);
})

/**
 * 查询所有
 */
router.get('/', async (req, res, next) => {
    await getHandler<bidAdDAOType>(req, res, next, findAll)
})

/**
 * 工具函数
 * 验证参数是否合格
 * @param item 验证参数
 */
function verify(item: bidAdDAOType) {
    if (!item.title) {
        return "title 属性不存在"
    }
    if (!item.content) {
        return "content 属性不存在"
    }
    if (!item.synopsis) {
        return "synopsis 属性不存在"
    }
    if (!item.imgsrc || !/^.+(\.jpg|\.png|\.jpeg|\.gif)$/.test(item.imgsrc)) {
        return "imgsrc 属性不存在"
    }
    return false;
}

/**
 * 添加一个用户
 */
router.post('/', async (req, res, next) => {
    await postHandler<bidAdDAOType>(req, res, next, addOne, addMore, verify);
})

/**
 * 修改
 */
router.put('/:id', async (req, res, next) => {
    await putHandler(req, res, next, upData);
})

/**
 * 删除多个
 */
router.delete('/', async (req, res, next) => {
    await delMoreHandler(req, res, next, removeMore);
})

/**
 * 删除指定一个
 */
router.delete('/:id', async (req, res, next) => {
    await delHandler(req, res, next, removeOne);
})

export default router;