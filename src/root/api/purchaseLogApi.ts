import { Router } from 'express';
import { ShoppingCartDAOType } from '../../dao/shoppingCartDAO';
import { addMore, addOne, updata, removeMore, removeOne, findAll, findById, findByUserId } from '../../services/purchaseLogSer';
import { getHandler, getResObj, putHandler } from '../util';

const router = Router();

router.get('/', async (req, res, next) => {
    await getHandler<ShoppingCartDAOType>(req, res, next, findAll);
})

router.get('/:id', async (req, res, next) => {

})

router.get('/user/:id', async (req, res, next) => {

})

router.post('/', async (req, res, next) => {

})

router.put('/:id', async (req, res, next) => {
    await putHandler(req,res,next,updata);
})

router.delete('/', async (req, res, next) => {

})

router.delete('/:id', async (req, res, next) => {

})

export default router;