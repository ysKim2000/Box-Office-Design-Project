const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const path = require('path');

const router = express.Router();
const PUBLIC = path.join(__dirname, '../views');
router.get('/signUp', async (req, res, next) => {
    try {
        res.sendFile(path.join(PUBLIC, "signUp.html"))
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('signUp/validation', async (req, res, next) => {
    try {
        const { id, password, name, birth, gender } = req.body;
        const user = await User.findOne({ where: { id } });
        if (user) {
            next('이미 등록된 사용자 아이디입니다.');
            return;
        }
        const hash = await bcrypt.hash(password, 8);
        await User.create({
            id,
            password: hash,
            name,
            birth,
            gender
        });
        res.redirect('/')
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;