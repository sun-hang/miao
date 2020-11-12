import { Router } from 'express';
import { newsDAOType } from '../../dao/newsDAO';
import { addMore, addOne, autoQuery, removeMore, removeOne, updata, findAll, findByPage, findOne, findTag } from '../../services/newsSer';
import { getResObj, putHandler } from '../util';
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
    let id = parseInt(req.params.id);
    if (!Object.is(NaN, id) && id > 0) {
        const result = await findOne(id)
        res.json(getResObj(200, "请求成功", result));
    } else {
        res.json(getResObj(200, 'id非数字或不在取值范围', null))
    }
})

function verify(item: newsDAOType) {
    if (!item.content) {
        return "content 属性不存在"
    }

    if (!item.ctime) {
        return 'ctime 属性不存在'
    }

    if (!item.imgsrc || !/^.+(\.jpg|\.png|\.jpeg|\.gif)/.test(item.imgsrc)) {
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
    let data = req.body.data;
    // 添加多个
    if (Array.isArray(data)) {
        data = data.filter((item) => {
            return !verify(item);
        })
        const result = await addMore(data);
        res.json(getResObj(200, "添加成功", result));
    } else {
        data = {
            ...req.body,
            ctime: Date.now() + ''
        }
        // 添加一个
        let flag = verify(data);
        if (!flag) {
            let result = await addOne(data);
            res.json(getResObj(200, "添加成功", result));
        } else {
            res.json(getResObj(200, flag, null))
        }
    }

})

router.put('/:id', async (req, res, next) => {
    await putHandler(req,res,next,updata);
})

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

router.delete('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!Object.is(NaN, id) && id > 0) {
        const result = await removeOne(id)
        res.json(getResObj(200, "删除成功", result));
    } else {
        res.json(getResObj(200, 'id非数字或不在取值范围', null))
    }
})

export default router;