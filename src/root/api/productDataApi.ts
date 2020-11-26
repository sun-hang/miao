import { Router } from 'express';
import { ProductDataDAOType } from '../../dao/productDataDAO';
import { addMore, addOne, removeMore, removeOne, updata, findAll, findById, findProductId } from '../../services/productDataSer';
import { delHandler, delMoreHandler, getHandler, getIdHandler, getResObj, postHandler, putHandler } from '../util';

const router = Router();

router.get('/', async (req, res, next) => {
    await getHandler<ProductDataDAOType>(req, res, next, findAll);
})

router.get('/:id', async (req, res, next) => {
    await getIdHandler<ProductDataDAOType>(req, res, next, findById);
})

router.get('/product/:id', async (req, res, next) => {
    await getIdHandler<ProductDataDAOType[]>(req, res, next, findProductId);
})

function verify(item: ProductDataDAOType, keys: string[]) {
    console.log(item)
    // for (const key of keys) {
    //     console.log(item[key])
    //     if (!item[key]) {
    //         return `${key} 属性不存在`
    //     }
    // }
    if(!item.productId){
        return `productId属性不存在`
    }
    if(!item.price){
        return `price属性不存在`
    }
    if(!item.smallImgSrc){
        return `smallImgSrc属性不存在`
    }
    if(!item.text){
        return `text属性不存在`
    }
    if(!item.bidImgSrc){
        return `bidImgSrc属性不存在`
    }
    if (!/^.+(\.jpg|\.png|\.jpeg|\.gif)$/.test(item.bidImgSrc)) {
        return "bidImgSrc 属性格式不存在"
    }

    if (!/^.+(\.jpg|\.png|\.jpeg|\.gif)$/.test(item.smallImgSrc)) {
        return "bidImgSrc 属性格式不存在"
    }

    return false;
}

router.post('/', async (req, res, next) => {
    console.log(req.body);
    await postHandler<ProductDataDAOType>(req, res, next, addOne, addMore, verify, ['productId', 'text', 'bidImgSrc', 'smallImgSrc', 'price']);
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