import { Router } from 'express';
import { ne } from 'sequelize/types/lib/operators';
import { UserAddressDAOType } from '../../dao/userAddressDAO';
import { addMore, addOne, removeMore, removeOne, updata, findAll, findByUserId, findOne } from '../../services/userAddressSer';
import { getHandler, getResObj, putHandler } from '../util';

const router: Router = Router();

router.get('/', async (req, res, next) => {
    await getHandler<UserAddressDAOType>(req, res, next, findAll);
})

router.get('/user/:id', async (req, res, next) => {

})

router.get("/:id", async (req, res, next) => {

})

router.post('/', async (req, res, next) => {

})

router.put('/:id', async (req, res, next) => {
    await putHandler(req, res, next, updata);
})

router.delete('/', async (req, res, next) => {

})

router.delete('/:id', async (req, res, next) => {

})

export default router;