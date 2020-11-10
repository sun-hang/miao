import { Router } from 'express';
import { getResObj } from '../util';
import { addMore, addOne, updata, removeMore, removeOne, findAll, findByName, findOne } from '../../services/userAdminSer';
import { userAdminDAOType } from '../../dao/userAdminDAO';

const router: Router = Router();

/**
 * 获取所有用户列表
 */
router.get('/', async (req, res, next) => {
    const result = await findAll();
    res.json(getResObj(200, "请求成功", result));
})

/**
 * 根据id获取
 */
router.get('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!Object.is(NaN, id) && id > 0) {
        const result = await findOne(id);
        res.json(getResObj(200, '请求成功', result));
    } else {
        res.json(getResObj(200, "id非数字或不在取值范围", null))
    }
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

    if (!item.imgsrc) {
        return '图片地址不存在';
    }

    if (!item.phone || !/^1[345678]{1}\d{9}$/.test(item.phone)) {
        return '手机号格式不对';
    }
}

/**
 * 添加一个或多个
 * data 添加多个 没有添加一个
 * loginUser，loginPassword imgSrc：一个默认的 Email phone sex
 */
router.post('/', async (req, res, next) => {

})

/**
 * 登录接口
 */
router.post('/login', async (req, res, next) => {

})

/**
 * 修改用户
 */
router.put('/:id', async (req, res, next) => {

})

/**
 * 删除多个
 */
router.delete('/', async (req, res, next) => {

})

/**
 * 删除一个
 */
router.delete('/:id', async (req, res, next) => {

})

export default router;