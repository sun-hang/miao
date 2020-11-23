import { Router } from 'express';
import path = require('path');
import fs = require('fs');
import { getResObj } from '../util';
const router = Router();

router.get('/img/:filename',async (req, res, next) => {
    try {
        const pathname = path.resolve(__dirname, '../../../files/' + req.params.filename);
        await fs.promises.stat(pathname);
        res.sendFile(pathname);
    } catch (error) {
        next(error);
    }
})

router.get('/:filename', async (req, res, next) => {
    try {
        const pathname = path.resolve(__dirname, '../../../files/' + req.params.filename);
        await fs.promises.stat(pathname);
        res.download(pathname, req.params.filename);
    } catch (error) {
        next(error);
    }
})

export default router; 