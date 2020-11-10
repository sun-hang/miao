import { Router } from 'express';
import { getResObj } from '../util';
import { bigPicDAOType } from '../../dao/bigPicDAO';
import { addMore, addOne, removeMore, removeOne, update, findAll, findById, findByNewOne } from '../../services/bigPicSer';
const router: Router = Router();

/**
 * 获取所有数据
 */
router.get('/', async (req, res, next) => {
    const result = await findAll();
    res.json(getResObj(200, "请求成功", result));
})

/**
 * 获取最新一条
 */
router.get('/new', async (req, res, next) => {
    const result = await findByNewOne();
    res.json(getResObj(200, '请求成功', result));
});

/**
 * 获取指定数据
 */
router.get('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (id > 0 && !Object.is(NaN, id)) {
        let result = await findById(id);
        res.json(getResObj(200, "请求成功", result));
    } else {
        res.json(getResObj(200, "id非数字或数值越界或不存在", null))
    }
})



/**
 * 工具函数
 * 验证数据是否合格
 * @param item 
 */
function verify(item: bigPicDAOType) {
    if (!item.imgsrc) {
        return "imgSrc 属性不存在"
    }
    return false;
}

/**
 * 添加一个或多个
 */
router.post('/', async (req, res, next) => {
    let data = req.body.data;
    if (Array.isArray(data)) {
        let dataFilter = data.filter((item) => {
            return !verify(item);
        })
        let result = await addMore(dataFilter);
        res.json(getResObj(200, "添加成功", result))
        return;
    }
    let data2: bigPicDAOType = {
        imgsrc: req.body.imgsrc
    }
    let flag = verify(data2);
    if (flag) {
        res.json(getResObj(200, flag, null))
    } else {
        const result = await addOne(data2);
        res.json(getResObj(200, "添加成功", result))
    }
})

/**
 * 修改指定数据
 */
router.put('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!Object.is(NaN, id) && id > 0) {
        const result = await update(id, req.body);
        res.json(getResObj(200, "修改成功", result));
    } else {
        res.json(getResObj(200, "id不存在或id不是数字或不在取值范围", null))
    }
})

/**
 * 删除多个数据
 */
router.delete('/', async (req, res, next) => {
    let ids = req.body.data;
    if (Array.isArray(ids)) {
        let data = ids.filter((item) => {
            return !Object.is(NaN, item) && item > 0
        })
        console.log(data);
        let result = await removeMore(data);
        res.json(getResObj(200, "删除成功", result));
    } else {
        res.json(getResObj(200, "数据格式错误，请传递一个data的数字数组", null))
    }
})

/**
 * 删除指定数据
 */
router.delete('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!Object.is(NaN, id) && id > 0) {
        const result = await removeOne(id);
        res.json(getResObj(200, "删除成功", result));
    } else {
        res.json(getResObj(200, "id不存在或id不是数字或不在取值范围", null))
    }
})

export default router;