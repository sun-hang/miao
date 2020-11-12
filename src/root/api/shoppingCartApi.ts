import { Router } from 'express';
import { ShoppingCartDAOType } from '../../dao/shoppingCartDAO';
import { addMore, addOne, removeMore, removeOne, update, findAll, findById, findDesc } from '../../services/shoppingCartSer';
import { getHandler, getResObj, putHandler } from '../util';

const router = Router();

router.get('/', async (req, res, next) => {
    await getHandler<ShoppingCartDAOType>(req, res, next, findAll);
})

router.get('/new', async (req, res, next) => {

})

router.get('/:id', async (req, res, next) => {

})

router.post('/', async (req, res, next) => {

})

router.put('/:id', async (req, res, next) => {
    await putHandler(req, res, next, update);
})

router.delete('/', async (req, res, next) => {

})

router.delete('/:id', async (req, res, next) => {

})

export default router;