import { Router } from 'express';
import { commentDAOType } from '../../dao/commentDAO';
import { delHandler, delMoreHandler, getIdHandler, getResObj, postHandler, putHandler } from '../util';
import { addMore, addOne, removeMore, removeOne, updata, findAll, findByPage, findDESC, findOne, findAllList } from '../../services/commentSer';
const router: Router = Router();

/**
 * 获取所有 productID
 * 分页获取 传参page & size & productID
 * 倒叙获取 传参（0|1） & productID
 */
router.get('/', async (req, res, next) => {
    let productId: number = req.query.productId ? parseInt(req.query.productId as string) : 0;

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
    } else if (Object.is(productId, NaN) && productId > 0) {
        // 获取所有
        result = await findAll(productId);
    } else {
        result = await findAllList();
    }
    res.json(getResObj(200, "请求成功", result));
    // productid 使用query
    // findAll  findByPage  findDesc
});

// 根据id进行获取
router.get('/:id', async (req, res, next) => {
    await getIdHandler<commentDAOType>(req, res, next, findOne);
})

function verify(item: commentDAOType, keys: string[]) {
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
    await postHandler<commentDAOType>(req, res, next, addOne, addMore, verify, ['']);
})

/**
 * 修改一个
 */
router.put('/:id', async (req, res, next) => {
    await putHandler(req, res, next, updata);
})

/**
 * 删除多个
 */
router.delete('/', async (req, res, next) => {
    await delMoreHandler(req, res, next, removeMore);
})

/**
 * 删除指定数据
 */
router.delete('/:id', async (req, res, next) => {
    await delHandler(req, res, next, removeOne);
})

export default router;