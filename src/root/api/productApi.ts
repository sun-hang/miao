import { Router } from "express";
import { ProductDAOType } from '../../dao/productDAO';
import { addMore, addOne, removeMore, removeOne, updata, findAll, findById, findByPageAndTag, findByTag } from '../../services/productSer';
import { getHandler, getResObj, putHandler } from '../util';
const router = Router();

router.get('/', async (req, res, next) => {
    
})
router.get('/tag', async (req, res, next) => {

})

router.get('/:id', async (req, res, next) => {

})

router.post('/', async (req, res, next) => {

})

router.put('/:id', async (req, res, next) => {
    await putHandler(req,res,next,updata);
})

router.delete('/', async (req, res, next) => {

})

router.delete('/:id', async () => {

})

export default router;