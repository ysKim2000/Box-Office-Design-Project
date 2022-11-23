const express = require('express');
const Reservation = require('../models/reservation');

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.locals.title = require('../package.json').name;
        res.render('reservation');
    })
    .post(async (req, res, next) => {
        const { clientId, reservation } = req.body;

        try {
            await reservation.create({ userId, reservation });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;
