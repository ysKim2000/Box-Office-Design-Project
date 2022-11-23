const express = require('express');
const { Client, Reservation } = require('../models');
const path = require('path');

const router = express.Router();
const PUBLIC = path.join(__dirname, '../views');

router.get('/clients', async (req, res, next) => {
    try {
        const clients = await Client.findAll({
            attributes: ['id', 'pw', 'name', 'birth', 'gender']
        });
        res.json(clients);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/reservations', async (req, res, next) => {
    try {
        const reservations = await reservation.findAll({});
        res.json(reservations);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/signup', async (req, res, next) => {
    try {
        res.sendFile(path.join(PUBLIC, "signUp.html"))
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/signUp/validation', async (req, res, next) => {
    try {
        const { id, password, name, birth, gender } = req.body;
        const client = await Client.findOne({where:{id}});
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
                birth,
                gender
            });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/data', async (req, res, next) => {
    try {
        const clients = await Client.findAll({
            attributes: ['id', 'pw', 'name', 'birth', 'gender'],
            include: {
                model: Reservation
            }
        });
        res.json(clients);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
