import { Router } from 'express';
import { delHandler, getHandler, getIdHandler, getResObj } from '../util';
import { addMore, addOne, updata, removeMore, removeOne, findAll, findByName, findOne } from '../../services/userAdminSer';
import { userAdminDAOType } from '../../dao/userAdminDAO';
import md5 from 'md5';
const router: Router = Router();

/**
 * 获取所有用户列表
 */
router.get('/', async (req, res, next) => {
    await getHandler<userAdminDAOType>(req, res, next, findAll);
})

/**
 * 根据id获取
 */
router.get('/:id', async (req, res, next) => {
    await getIdHandler<userAdminDAOType>(req, res, next, findOne);
})

/**
 * 验证属性是否合法
 * @param item 
 */
function verify(item: userAdminDAOType) {

    if (!item.loginUser || item.loginUser.length < 4) {
        return '用户名不足四位';
    }

    if (!item.loginPassword || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/.test(item.loginPassword)) {
        return '密码至少包含一个大写字母一个数字一个小写字母的8~16位字符';
    }

    if (!item.email || !/^[a-z0-9]{1}[a-z0-9_-]{1,}@[a-z0-9]{1,}(\.[a-z]{2,})*\.[a-z]{2,}$/.test(item.email.toLocaleLowerCase())) {
        return '邮箱格式不正确';
    }

    if (!item.imgsrc || !/^.+(\.jpg|\.png|\.jpeg|\.gif)$/.test(item.imgsrc)) {
        return '图片地址不存在或格式不对';
    }

    if (!item.phone || !/^1[345678]{1}\d{9}$/.test(item.phone)) {
        return '手机号格式不对';
    }

    if (typeof item.sex !== 'boolean') {
        return '参数不正确';
    }
}

/**
 * 添加一个或多个
 * data 添加多个 没有添加一个
 * loginUser，loginPassword imgSrc：一个默认的 Email phone sex
 */
router.post('/', async (req, res, next) => {
    let data = req.body.data;
    let arr: userAdminDAOType[] = [];
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length - 1; i++) {
            for (let j = i + 1; j < data.length; j++) {
                if (data[i].loginUser === data[j].loginUser && data[i] != undefined) {
                    data[i] = undefined;
                }
            }
        }
        await Promise.all(data.map(async (item) => {
            if (!item) {
                return
            }
            let v = verify(item);
            let t = await findByName(item.loginUser);
            if (!v && t.length < 1) {
                let result = await addOne({ ...item, loginPassword: md5(item.loginPassword) });
                arr.push(result);
            }
        }))
        res.json(getResObj(200, '添加成功', arr))
    } else {
        data = {
            loginUser: req.body.loginUser,
            loginPassword: req.body.loginPassword,
            email: req.body.email,
            imgsrc: req.body.imgsrc,
            phone: req.body.phone,
            sex: req.body.sex
        }
        if (!verify(data)) {
            data.loginPassword = md5(req.body.loginPassword);
            const resu = await findByName(data.loginUser);
            if (resu.length > 0) {
                res.json(getResObj(200, '用户已存在', null))
                return
            }
            const result = await addOne(data);
            res.json(getResObj(200, '请求成功', result));
        } else {
            res.json(getResObj(200, verify(data) as string, null))
        }
    }
})

/**
 * 登录接口
 */
router.post('/login', async (req, res, next) => {
    let loginUser = req.body.loginUser;
    let loginPassword = req.body.loginPassword;
    if (!loginUser) {
        res.json(getResObj(200, "用户名为空", null))
        return
    }

    if (!loginPassword) {
        res.json(getResObj(200, "密码为空", null))
        return
    }

    const result = await findByName(loginUser);
    if (result.length < 1) {
        res.json(getResObj(200, '用户不存在', null))
        return;
    }
    if (result[0].loginPassword !== md5(loginPassword)) {
        res.json(getResObj(200, "密码不正确", null))
    } else {
        let session: any = req.session;
        session.user = result[0];
        req.session = session;
        result[0].loginPassword = '';
        res.json(getResObj(200, "登录成功", result[0]))
    }
})

/**
 * 修改用户
 */
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
        res.json(getResObj(200, "修改成功", result));
    } else {
        res.json(getResObj(200, "id非数字或id不在取值范围", null))
    }
})

/**
 * 删除多个
 */
router.delete('/', async (req, res, next) => {
    let data = req.body.data;
    if (Array.isArray(data)) {
        data = data.filter((item) => {
            return typeof item === 'number' && !Object.is(NaN, item) && item > 0
        })
        console.log(data)
        const result = await removeMore(data);
        res.json(getResObj(200, "删除成功", result))
    } else {
        res.json(getResObj(200, "参数不合法，请传入一个data的数字数组", null))
    }
})

/**
 * 删除一个
 */
router.delete('/:id', async (req, res, next) => {
    await delHandler(req, res, next, removeOne);
})

export default router;