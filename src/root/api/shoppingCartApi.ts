import { Router } from 'express';
import { ShoppingCartDAOType } from '../../dao/shoppingCartDAO';
import { addMore, addOne, removeMore, removeOne, update, findAll, findById, findDesc } from '../../services/shoppingCartSer';
import { delHandler, delMoreHandler, getHandler, getIdHandler, getResObj, postHandler, putHandler } from '../util';

const router = Router();

router.get('/', async (req, res, next) => {
    await getHandler<ShoppingCartDAOType>(req, res, next, findAll);
})

router.get('/new', async (req, res, next) => {
    await getHandler<ShoppingCartDAOType>(req, res, next, findDesc);
})

router.get('/:id', async (req, res, next) => {
    await getIdHandler<ShoppingCartDAOType>(req, res, next, findById);
})

function verify(item: ShoppingCartDAOType, keys: string[]) {
    for (const key of keys) {
        if (!item[key]) {
            return `${key} 属性不存在`
        }
    }
    return false;
}

router.post('/', async (req, res, next) => {
    await postHandler<ShoppingCartDAOType>(req, res, next, addOne, addMore, verify, ["userId", "productId", "productDataId", 'number', 'remarks']);
})

router.put('/:id', async (req, res, next) => {
    await putHandler(req, res, next, update);
})

router.delete('/', async (req, res, next) => {
    await delMoreHandler(req, res, next, removeMore);
})

router.delete('/:id', async (req, res, next) => {
    await delHandler(req, res, next, removeOne);
})

export default router;