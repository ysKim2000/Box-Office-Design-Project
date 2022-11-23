const express = require('express');
const { Client, Reservation } = require('../models');

const router = express.Router();

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
