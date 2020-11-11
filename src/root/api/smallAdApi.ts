import { Router } from 'express';
import { smallAdDAOType } from '../../dao/smallAdDAO';
import { addMore, addOne, removeMore, removeOne, updata, findAll, findDesc, findOne } from '../../services/smallAdSer';
import { getResObj } from '../util';

const router: Router = Router();

router.get('/', async (req, res, next) => {

})

router.get('/new', async (req, res, next) => {

})

router.get('/:id', async (req, res, next) => {

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