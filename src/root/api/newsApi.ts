import { Router } from 'express';
import { newsDAOType } from '../../dao/newsDAO';
import { addMore, addOne, autoQuery, removeMore, removeOne, updata, findAll, findByPage, findOne, findTag } from '../../services/newsSer';
import { getResObj } from '../util';
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

})

router.post('/', async (req, res, next) => {

})

router.put('/:id', async (req, res, next) => {

})

router.delete('/', async (req, res, next) => {

})

router.delete('/:id', async () => {

})

export default router;