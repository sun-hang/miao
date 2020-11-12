import { Router } from 'express';
import md5 from 'md5';
import { myAdminDAOType } from '../../dao/myAdminDAO';
import { addOne, removeMore, removeOne, updata, findAll, findByName, findOne } from '../../services/myAdminSer'
import { getResObj, getHandler } from '../util';

const router = Router();

router.get('/', async (req, res, next) => {
    await getHandler<myAdminDAOType>(req, res, next, findAll);
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
    data.ctime = Date.now() + '';
    let key = verify(data);
    if (!key) {
        const resultList = await findByName(data.loginUser);
        if (resultList.length > 0) {
            res.json(getResObj(200, "用户已存在", null))
            return;
        }
        data.loginPassword = md5(req.body.loginPassword);
        const result = await addOne(data);
        res.json(getResObj(200, '添加成功', result))
    } else {
        res.json(getResObj(200, key, null))
    }
})

router.post('/login', async (req, res, next) => {
    let loginUser = req.body.loginUser;
    let loginPassword = req.body.loginPassword;
    if (!loginUser) {
        res.json(getResObj(200, "用户名不存在", null))
        return
    }

    if (!loginPassword) {
        res.json(getResObj(200, "密码不存在", null))
    }

    const result = await findByName(loginUser);
    if (result.length > 0) {
        if (result[0].loginPassword === md5(loginPassword)) {
            // 卖家用户登录设置session的myuser属性 买家登录设置session的user属性
            let session: any = req.session;
            session.myUser = result[0];
            req.session = session;
            result[0].loginPassword = '';
            res.json(getResObj(200, "登录成功", result[0]))
        } else {
            res.json(getResObj(200, '密码错误', null));
        }
    } else {
        res.json(getResObj(200, "用户不存在", null))
    }
})

router.put('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!Object.is(NaN, id) && id > 0) {
        if (req.body.loginUser) {
            const result = await findByName(req.body.loginUser);
            if (result.length > 0) {
                res.json(getResObj(200, "用户名已存在", null));
                return;
            }
        }
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
