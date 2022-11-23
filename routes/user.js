const express = require('express');
const bcrypt = require('bcrypt')
const User = require('../models/user');
const Info = require('../models/info')

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        try {
            const users = await User.findAll({
                attributes: ['id']
            });

            res.locals.title = require('../package.json').name;
            res.locals.port = process.env.PORT;
            res.locals.users = users.map(v => v.id);
            res.render('user');
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        const { id, password, name, description, favorprof, lovelife } = req.body;

        const user = await User.findOne({ where: { id } });
        if (user) {
            next('이미 등록된 사용자 아이디입니다.');
            return;
        }

        try {
            const hash = await bcrypt.hash(password, 12);
            await User.create({
                id,
                password: hash,
                name,
                description
            });
            await Info.create({
                userId: id,
                favorProf: favorprof,
                loveLife: lovelife,
            });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.post('/update', async (req, res, next) => {
    try {
        const result = await User.update({
            description: req.body.description
        }, {
            where: { id: req.body.id }
        });

        if (result) res.redirect('/');
        else next('Not updated!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
        const result = await User.destroy({
            where: { id: req.params.id }
        });

        if (result) res.redirect('/');
        else next('Not deleted!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/:id/comments', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id }
        });

        if (user) {
            const comments = await user.getComments();
            res.json(comments);
        } else
            next(`There is no user with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'name', 'description'],
            include: [{
                model: Info
            }]
        });
        res.json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
