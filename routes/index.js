const express = require('express');
const path = require('path');
const { User, Comment } = require('../models');
const PUBLIC = path.join(__dirname, '../views');

const router = express.Router();


router.get('/movie', async (req, res, next) => {
    try {
        res.sendFile(path.join(PUBLIC, 'movie.html'))
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/users', async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'description']
        });
        res.json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/comments', async (req, res, next) => {
    try {
        const comments = await Comment.findAll({});
        res.json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/data', async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'description'],
            include: {
                model: Comment
            }
        });
        res.json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
