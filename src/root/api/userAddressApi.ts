import { Router } from 'express';
import { UserAddressDAOType } from '../../dao/userAddressDAO';
import { addMore, addOne, removeMore, removeOne, updata, findAll, findByUserId, findOne } from '../../services/userAddressSer';
import { getResObj } from '../util';

const router: Router = Router();

router.get('/', async (req, res, next) => {

})

router.get('/user/:id', async (req, res, next) => {

})

router.get("/:id", async (req, res, next) => {

})

router.post('/', async (req, res, next) => {

})

router.put('/:id', (req, res, next) => {

})

router.delete('/', async (req, res, next) => {

})

router.delete('/:id', async (req, res, next) => {

})

export default router;