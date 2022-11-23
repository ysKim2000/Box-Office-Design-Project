const express = require('express');
const Comment = require('../models/comment');

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.locals.title = require('../package.json').name;
        res.render('comment');
    })
    .post(async (req, res, next) => {
        const { userId, comment } = req.body;

        try {
            await Comment.create({ userId, comment });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;
