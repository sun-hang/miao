import { Router } from 'express';
import { ne } from 'sequelize/types/lib/operators';
import { UserAddressDAOType } from '../../dao/userAddressDAO';
import { addMore, addOne, removeMore, removeOne, updata, findAll, findByUserId, findOne } from '../../services/userAddressSer';
import { delHandler, delMoreHandler, getHandler, getIdHandler, getResObj, postHandler, putHandler } from '../util';

const router: Router = Router();

router.get('/', async (req, res, next) => {
    await getHandler<UserAddressDAOType>(req, res, next, findAll);
})

router.get('/user/:id', async (req, res, next) => {
    await getIdHandler<UserAddressDAOType[]>(req, res, next, findByUserId);
})

router.get("/:id", async (req, res, next) => {
    await getIdHandler<UserAddressDAOType>(req, res, next, findOne);
})

function verify(item: UserAddressDAOType) {
    for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
            if (!item[key]) {
                return `${key} 属性不存在`
            }
        }
    }
    return false;
}

router.post('/', async (req, res, next) => {
    await postHandler<UserAddressDAOType>(req, res, next, addOne, addMore, verify);
})

router.put('/:id', async (req, res, next) => {
    await putHandler(req, res, next, updata);
})

router.delete('/', async (req, res, next) => {
    await delMoreHandler(req, res, next, removeMore);
})

router.delete('/:id', async (req, res, next) => {
    await delHandler(req, res, next, removeOne);
})

export default router;