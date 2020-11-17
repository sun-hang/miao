import { Router } from 'express';
import { newsDAOType } from '../../dao/newsDAO';
import { addMore, addOne, autoQuery, removeMore, removeOne, updata, findAll, findByPage, findOne, findTag } from '../../services/newsSer';
import { delHandler, delMoreHandler, getIdHandler, getResObj, postHandler, putHandler } from '../util';
const router = Router();

router.get('/', async (req, res, next) => {
    console.log(req.query)
    let page = req.query.page;
    let size = req.query.size;
    let tag = req.query.tag ? req.query.tag : '';
    let result: any;
    if (page) {
        result = await findByPage(parseInt(page as string), parseInt(size as string), tag as string);
    } else {
        result = await findAll();
    }
    res.json(getResObj(200, '请求成功', result));
})
router.get('/tag/:tag', async (req, res, next) => {
    let tag = req.params.tag ? req.params.tag : '';
    const result = await findTag(tag);
    res.json(getResObj(200, '请求成功', result));
})

router.get('/:id', async (req, res, next) => {
    await getIdHandler<newsDAOType>(req, res, next, findOne);
})

function verify(item: newsDAOType, keys: string[]) {
    if (!item.content) {
        return "content 属性不存在"
    }

    if (!item.ctime) {
        return 'ctime 属性不存在'
    }

    if (!item.imgsrc || !/^.+(\.jpg|\.png|\.jpeg|\.gif)$/.test(item.imgsrc)) {
        return "imgsrc 属性不存在或格式不正确"
    }

    if (!item.synopsis) {
        return "synopsis 属性不存在"
    }

    if (!item.tag) {
        return "tag 属性不存在"
    }

    if (!item.title) {
        return "title 属性不存在"
    }

    return false;
}

router.post('/', async (req, res, next) => {
    await postHandler<newsDAOType>(req, res, next, addOne, addMore, verify, ['']);
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