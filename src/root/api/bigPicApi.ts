import { Router } from 'express';
import { getResObj, getHandler, putHandler, delHandler, delMoreHandler, getIdHandler, postHandler } from '../util';
import { bigPicDAOType } from '../../dao/bigPicDAO';
import { addMore, addOne, removeMore, removeOne, update, findAll, findById, findByNewOne } from '../../services/bigPicSer';
const router: Router = Router();

/**
 * 获取所有数据
 */
router.get('/', async (req, res, next) => {
    await getHandler<bigPicDAOType>(req, res, next, findAll);
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
    await getIdHandler<bigPicDAOType>(req, res, next, findById);
})



/**
 * 工具函数
 * 验证数据是否合格
 * @param item 
 */
function verify(item: bigPicDAOType, keys: string[]) {
    if (!item.imgsrc) {
        return "imgSrc 属性不存在"
    }
    return false;
}

/**
 * 添加一个或多个
 */
router.post('/', async (req, res, next) => {
    await postHandler<bigPicDAOType>(req, res, next, addOne, addMore, verify, ['']);
})

/**
 * 修改指定数据
 */
router.put('/:id', async (req, res, next) => {
    await putHandler(req, res, next, update);
})

/**
 * 删除多个数据
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