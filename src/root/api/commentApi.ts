import { Router } from 'express';
import { commentDAOType } from '../../dao/commentDAO';
import { getResObj } from '../util';
import { addMore, addOne, removeMore, removeOne, updata, findAll, findByPage, findDESC, findOne } from '../../services/commentSer';
const router: Router = Router();

/**
 * 获取所有 productID
 * 分页获取 传参page & size & productID
 * 倒叙获取 传参（0|1） & productID
 */
router.get('/', async (req, res, next) => {
    let productId: number = req.query.productId ? parseInt(req.query.productId as string) : 0;
    if (Object.is(productId, NaN) && productId > 0) {
        let desc = req.query.desc ? parseInt(req.query.desc as string) : 0;
        let page = req.query.page ? parseInt(req.query.page as string) : 0;
        let size = req.query.size ? parseInt(req.query.size as string) : 10;
        let result;
        // 倒叙获取
        if (desc == 1) {
            result = await findDESC(productId);
        } else if (page > 0) {
            // 分页获取
            result = await findByPage(productId, page, size);
        } else {
            // 获取所有
            result = await findAll(productId);
        }
        res.json(getResObj(200, "请求成功", result));
    } else {
        res.json(getResObj(200, "产品id错误", null))
    }
    // productid 使用query
    // findAll  findByPage  findDesc
});

// 根据id进行获取
router.get('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!Object.is(NaN, id) && id > 0) {
        const result = await findOne(id);
        res.json(getResObj(200, '请求成功', result));
    } else {
        res.json(getResObj(200, "id参数非数字或不在范围", null));
    }
})

function verify(item: commentDAOType) {
    if (!item.content) {
        return "属性 conent 不存在"
    }
    if (!item.ctime) {
        return "属性 ctime 不存在"
    }
    if (!item.imgs) {
        return "属性 imgs 不存在"
    }
    if (!item.productid) {
        return "属性 productid 不存在"
    }
    if (!item.username) {
        return "属性 username 不存在"
    }
    if (!item.userid) {
        return "属性 userid 不存在"
    }
    return false;
}

/**
 * 添加一个
 * 添加多个
 */
router.post('/', async (req, res, next) => {
    let data = req.body.data;
    // 添加多个
    if (Array.isArray(data)) {
        data = data.filter((item) => {
            return !verify(item);
        })
        const result = await addMore(data);
        res.json(getResObj(200, "添加成功", result));
        return
    }
    data = {
        content: req.body.content,
        ctime: Date.now(),
        imgs: req.body.imgs,
        productid: req.body.productid,
        username: req.body.username,
        userid: req.body.userid
    }

    // 添加一个
    let flag = verify(data);
    if (!flag) {
        let result = await addOne(data);
        res.json(getResObj(200, "添加成功", result));
    } else {
        res.json(getResObj(200, flag, null))
    }
})

/**
 * 修改一个
 */
router.put('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (Object.is(NaN, id) && id > 0) {
        const result = await updata(id, req.body);
        res.json(getResObj(200, "修改成功", result));
    } else {
        res.json(getResObj(200, "id非数字或参数不在范围", null))
    }
})

/**
 * 删除多个
 */
router.delete('/', async (req, res, next) => {
    let ids = req.body.data;
    if (Array.isArray(ids)) {
        ids = ids.filter((item) => {
            return !Object.is(NaN, item) && item > 0
        })
        const result = await removeMore(ids);
        res.json(getResObj(200, '删除成功', result));
    } else {
        res.json(getResObj(200, "请传入一个data的数组", null));
    }
})

/**
 * 删除指定数据
 */
router.delete('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (Object.is(NaN, id) && id > 0) {
        const result = await removeOne(id);
        res.json(getResObj(200, "删除成功", result));
    } else {
        res.json(getResObj(200, "id非数字或数字不在范围", null))
    }
})

export default router;