import { Router } from 'express';
import { ProductDataDAOType } from '../../dao/productDataDAO';
import { addMore, addOne, removeMore, removeOne, updata, findAll, findById, findProductId } from '../../services/productDataSer';
import { getResObj } from '../util';

const router = Router();

router.get('/', async (req, res, next) => {

})

router.get('/:id', async (req, res, next) => {

})

router.get('/product/:id', async (req, res, next) => {

})

router.post('/', async (req, res, next) => {

})

router.put('/:id', async (req, res, next) => {

})

router.delete('/', async (req, res, next) => {

})

router.delete('/:id', async (req, res, next) => {

})

export default router;