import { Router } from 'express';
import { smallAdDAOType } from '../../dao/smallAdDAO';
import { addMore, addOne, removeMore, removeOne, updata, findAll, findDesc, findOne } from '../../services/smallAdSer';
import { delHandler, delMoreHandler, getHandler, getIdHandler, getResObj, postHandler, putHandler } from '../util';

const router: Router = Router();

router.get('/', async (req, res, next) => {
    await getHandler<smallAdDAOType>(req, res, next, findAll);
})

router.get('/new', async (req, res, next) => {
    await getHandler<smallAdDAOType>(req, res, next, findDesc);
})

router.get('/:id', async (req, res, next) => {
    await getIdHandler<smallAdDAOType>(req, res, next, findOne);
})

function verify(item: smallAdDAOType) {
    for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
            if (!item[key]) {
                return `${key} 属性不存在`;
            }
        }
    }

    return false;
}

router.post('/', async (req, res, next) => {
    await postHandler<smallAdDAOType>(req, res, next, addOne, addMore, verify);
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