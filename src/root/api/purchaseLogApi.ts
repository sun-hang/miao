import { Router } from 'express';
import { ShoppingCartDAOType } from '../../dao/shoppingCartDAO';
import { addMore, addOne, update, removeMore, removeOne, findAll, findById, findByUserId } from '../../services/purchaseLogSer';
import { getResObj } from '../util';

const router = Router();

router.get('/', async (req, res, next) => {

})

router.get('/:id', async (req, res, next) => {

})

router.get('/user/:id', async (req, res, next) => {

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