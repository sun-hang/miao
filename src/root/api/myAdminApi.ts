import { Router } from 'express';
import md5 from 'md5';
import { myAdminDAOType } from '../../dao/myAdminDAO';
import { addOne, removeMore, removeOne, updata, findAll, findByName, findOne } from '../../services/myAdminSer'
import { getResObj } from '../util';

const router = Router();

router.get('/', async (req, res, next) => {
    const result = await findAll();
    res.json(getResObj(200, '请求成功', result));
})

router.get('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!Object.is(NaN, id) && id > 0) {
        const result = await findOne(id);
        res.json(getResObj(200, '请求成功', result));
    } else {
        res.json(getResObj(100, "id非数字或不在取值范围", null))
    }
})

function verify(item: myAdminDAOType) {
    if (!item.loginUser || item.loginUser.length < 4) {
        return '用户名不存在或长度过短';
    }

    if (!item.loginPassword && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/.test(item.loginPassword)) {
        return '密码为空或密码格式不正确';
    }

    if (!item.ctime) {
        return 'ctime 不存在';
    }

    if (item.email && !/^[a-z0-9]{1}[a-z0-9_-]{1,}@[a-z0-9]{1,}(\.[a-z]{2,})*\.[a-z]{2,}$/.test(item.email.toLocaleLowerCase())) {
        return '邮箱格式不正确';
    }
    return false;
}

router.post('/', async (req, res, next) => {
    let data = req.body;
    data.ctime = Date.now();
    let key = verify(data);
    if (!key) {
        data.loginPassword = md5(req.body.loginPassword);
        const result = await addOne(data);
        res.json(getResObj(200, '添加成功', result))
    } else {
        res.json(getResObj(200, key, null))
    }
})

router.post('/login', async (req, res, next) => {

})

router.put('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!Object.is(NaN, id) && id > 0) {
        const result = await updata(id, req.body);
        res.json(getResObj(200, '修改成功', result));
    } else {
        res.json(getResObj(100, "id非数字或不在取值范围", null))
    }
})

router.delete('/', async (req, res, next) => {
    let data = req.body.data;
    if (Array.isArray(data)) {
        data = data.filter((item) => {
            return typeof item === 'number' && !Object.is(NaN, item) && item > 0;
        })
        const result = await removeMore(data);
        res.json(getResObj(200, "删除成功", result));
    } else {
        res.json(getResObj(200, "请传一个data的数字数组", null))
    }
})

router.delete('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!Object.is(NaN, id) && id > 0) {
        const result = await removeOne(id);
        res.json(getResObj(200, '删除成功', result));
    } else {
        res.json(getResObj(100, "id非数字或不在取值范围", null))
    }
})

export default router;
