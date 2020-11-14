import { NextFunction, Router, Request, Response } from 'express';

const router: Router = Router();
import jimp from 'jimp';
import multer from 'multer';
import path from 'path';
import { ne } from 'sequelize/types/lib/operators';
import { getResObj } from '../util';
let storage = multer.diskStorage({
    destination(req, file, cd) {
        cd(null, path.resolve(__dirname, '../../../files'));
    },
    filename(req, file, callback) {
        let ext = path.extname(file.originalname);
        callback(null, path.basename(file.originalname, ext) + Date.now() + (Math.floor(Math.random() * 100)) + ext);
    }
}) 

async function mark(pathname: string, targetPath: string) {
    const temp = await jimp.read(pathname);
    temp.resize(80, 80).write(targetPath);
}

const uploadImage = multer({
    storage,
    limits: {
        fields: 10,
        fileSize: 1024 * 1024 * 100
    }
})

function handler(req: Request, res: Response, next: NextFunction) {
    let data = Object.values(req.files);
    let srcs: string[] = [];
    console.log(data);
    data.forEach((item) => {
        srcs.push(item.filename);
    })
    res.json(getResObj(200, "上传成功", { srcList: srcs }))
}

/**
 * 上传下载文件
 */
router.post('/images', uploadImage.array('image', 16), async (req, res, next) => {
    handler(req, res, next);
})

router.post('/file', uploadImage.array('files', 16), async (req, res, next) => {
    handler(req, res, next);
})

router.post('/userimg', uploadImage.single('userImg'), async (req, res, next) => {
    let filename = req.file.filename;
    let targetPath = 'min' + filename;
    await mark(filename, targetPath);
    res.json(getResObj(200, '上传成功', { filename, targetPath }))
})

export default router;

