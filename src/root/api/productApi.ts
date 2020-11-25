import { Router } from "express";
import { ProductDAOType } from '../../dao/productDAO';
import { addMore, addOne, removeMore, removeOne, updata, findAll, findById, findByPageAndTag, findByTag } from '../../services/productSer';
import { delHandler, delMoreHandler, getHandler, getIdHandler, getResObj, postHandler, putHandler } from '../util';
const router = Router();

router.get('/', async (req, res, next) => {
    let tag: string = req.query.tag ? req.query.tag as string : "";
    let name: string = req.query.name ? req.query.name as string : "";
    let page = parseInt(req.query.page as string);
    let size = parseInt(req.query.size as string);

    // 分页查询
    if (page > 0 && size > 0) {
        const result = await findByPageAndTag(page, size, tag, name);
        res.json(getResObj(200, "请求成功", result));
    } else {
        const result = await findAll();
        res.json(getResObj(200, "请求成功", result));
    }
})
router.get('/tag', async (req, res, next) => {
    let tag = req.query.tag as string;
    const result = await findByTag(tag);
    res.json(getResObj(200, "请求成功", result));
})

router.get('/:id', async (req, res, next) => {
    await getIdHandler<ProductDAOType>(req, res, next, findById);
})

function verify(item: ProductDAOType, keys: string[]) {

    for (const key of keys) {
        if (!item[key]) {
            return `${key} 属性不存在`;
        }
    }

    if (!/^.+(\.jpg|\.png|\.jpeg|\.gif)$/.test(item.adImgSrc)) {
        return '格式不正确';
    }

    let listImgSrc: string[] = JSON.parse(item.listImgSrc);
    console.log(listImgSrc);
    listImgSrc = listImgSrc.filter((item) => {
        return !/^.+(\.jpg|\.png|\.jpeg|\.gif)$/.test(item);
    })

    if (listImgSrc.length > 1) {
        return 'listImgSrc 格式不正确';
    }

    return false;
}

router.post('/', async (req, res, next) => {
    await postHandler<ProductDAOType>(req, res, next, addOne, addMore, verify, ['productName', 'originalPrice', 'nowPrice', 'listImgSrc', 'adImgSrc', 'synopsis', 'synopsisImgSrc']);
})

router.put('/:id', async (req, res, next) => {
    await putHandler(req, res, next, updata);
})

router.delete('/', async (req, res, next) => {
    await delMoreHandler(req, res, next, removeMore);
})

router.delete('/:id', async (req, res, next) => {
    await delHandler(req, res, next, removeOne);
})

export default router;