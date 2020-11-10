import { Router } from 'express';
import { bidAdDAOType } from '../../dao/bigAdDAO';
import { findByNewOne, findById, findAll, addOne, upData, removeOne, removeMore, addMore } from '../../services/bidAdSer'
import { getResObj, ResObjType } from '../util'
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
    let id = parseInt(req.params.id);
    if (!Object.is(NaN, id)) {
        let result = await findById(id);
        res.json(getResObj(200, "请求成功", result));
    } else {
        res.json(getResObj(200, "id错误", null))
    }
})

/**
 * 查询所有
 */
router.get('/', async (req, res, next) => {
    const result = await findAll();
    res.json(getResObj(200, "请求成功", result))
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
    if (!item.imgsrc) {
        return "imgsrc 属性不存在"
    }
    return false;
}

/**
 * 添加一个用户
 */
router.post('/', async (req, res, next) => {
    let dataList = req.body.data;
    if (dataList && Array.isArray(dataList)) {
        let len = dataList.filter((item) => {
            return !verify(item);
        })
        let result = await addMore(len);
        res.json(getResObj(200, "添加成功", result))
        return;
    }

    const data: bidAdDAOType = {
        title: req.body.title,
        content: req.body.content,
        synopsis: req.body.synopsis,
        imgsrc: req.body.imgsrc
    }

    const flag = verify(data);
    if (flag) {
        res.json(getResObj(200, flag, null))
    } else {
        const result = await addOne(data);
        res.json(getResObj(200, "添加成功", result));
    }
})

/**
 * 修改
 */
router.put('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (!Object.is(NaN, id) || id != 0) {
        const result = await upData(req.body, id);
        res.json(getResObj(200, "修改成功", result))
    } else {
        res.json(getResObj(200, "id错误", null))
    }
})

/**
 * 删除多个
 */
router.delete('/', async (req, res, next) => {
    let ids = req.body.ids;
    let len: Array<number> = [];
    if (ids && Array.isArray(ids)) {
        len = ids.filter((item: any) => {
            let it = parseInt(item);
            return Object.is(it, NaN) || it == 0;
        })
    }

    if (len.length > 0) {
        res.json(getResObj(200, "参数有误，数组里包含非数字或等于0", null))
    } else {
        const result = await removeMore(req.body.ids);
        res.json(getResObj(200, "删除成功", result));
    }
})

/**
 * 删除指定一个
 */
router.delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (!Object.is(NaN, id) || id != 0) {
        const result = await removeOne(id);
        res.json(getResObj(200, "删除成功", result));
    } else {
        res.json(getResObj(200, "id错误", null))
    }

})

export default router;