import { Router } from 'express';
const router: Router = Router();
import { add, findAllTags, remove } from '../../services/tagSer';
import { getResObj } from '../util'
/**
 * 查询标签
 */
router.get('/', async (req, res, next) => {
    const result = await findAllTags();
    res.json(getResObj(200, '请求成功', result))
})

/**
 * 添加一条标签数据
 */
router.post('/', async (req, res, next) => {
    let name: string = req.body.name || '';
    let producttagId = parseInt(req.body.producttagId) || 0;
    if (!name || !producttagId) {
        res.json(getResObj(200, "name或producttagId属性为空", null))
        return;
    }
    const result = await findAllTags();
    res.json(getResObj(200, '请求成功', result));
})

/**
 * 删除一条标签数据
 */
router.delete('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!id) {
        res.json(getResObj(200, "id不正确", null))
        return
    }
    let result = await remove(id);
    res.json(getResObj(200, '删除成功', result));
})

export default router