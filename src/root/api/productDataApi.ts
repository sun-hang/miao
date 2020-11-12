import { Router } from 'express';
import { ProductDataDAOType } from '../../dao/productDataDAO';
import { addMore, addOne, removeMore, removeOne, updata, findAll, findById, findProductId } from '../../services/productDataSer';
import { getHandler, getResObj, putHandler } from '../util';

const router = Router();

router.get('/', async (req, res, next) => {
    await getHandler<ProductDataDAOType>(req,res,next,findAll);
})

router.get('/:id', async (req, res, next) => {

})

router.get('/product/:id', async (req, res, next) => {

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