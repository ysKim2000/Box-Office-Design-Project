const express = require('express');
const bcrypt = require('bcrypt')
const client = require('../models/client');
const { Reservation } = require('../models');

const router = express.Router();

// const client = {"kys":{"pw":"1234"}};

router.route('/')
    .get(async (req, res, next) => {
        try {
            const clients = await Client.findAll({
                attributes: ['id']
            });

            res.locals.title = require('../package.json').name;
            res.locals.port = process.env.PORT;
            res.locals.clients = clients.map(v => v.id);
            res.render('client');
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        const { id, password, name, birth, gender } = req.body;

        const client = await client.findOne({ where: { id } });
        if (client) {
            next('이미 등록된 사용자 아이디입니다.');
            return;
        }

        try {
            const hash = await bcrypt.hash(password, 12);
            await client.create({
                id,
                password: hash,
                name,
                birth,
                gender
            });
            await Reservation.create({
                clientId: id,
                moviecode,
                moviename,
                movietime,
                movieseats
            });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

// router.post('/update', async (req, res, next) => {
//     try {
//         const result = await client.update({
//             description: req.body.description
//         }, {
//             where: { id: req.body.id }
//         });

//         if (result) res.redirect('/');
//         else next('Not updated!')
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// });

// router.get('/delete/:id', async (req, res, next) => {
//     try {
//         const result = await client.destroy({
//             where: { id: req.params.id }
//         });

//         if (result) res.redirect('/');
//         else next('Not deleted!')
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// });

router.get('/:id/reservations', async (req, res, next) => {
    try {
        const client = await client.findOne({
            where: { id: req.params.id }
        });

        if (client) {
            const reservations = await client.getReservations();
            res.json(reservations);
        } else
            next(`There is no client with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const client = await client.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'pw', 'name', 'birth', 'gender'],
            include: [{
                model: Reservation
            }]
        });
        res.json(client);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
