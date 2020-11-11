import { Router } from 'express';
import { newsDAOType } from '../../dao/newsDAO';
import { addMore, addOne, autoQuery, removeMore, removeOne, updata, findAll, findByPage, findOne, findTag } from '../../services/newsSer';
import { getResObj } from '../util';
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

})

router.delete('/', async (req, res, next) => {

})

router.delete('/:id', async () => {

})

export default router;