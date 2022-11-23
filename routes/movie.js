const express = require('express');
const path = require('path');

const router = express.Router();
const PUBLIC = path.join(__dirname, '../views');
const Ticket = require('../models/ticket');

router.get('/movieRank', async (req, res) => {
    try {
        res.sendFile(path.join(PUBLIC, 'movieRank.html'));
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/movieReserve', async (req, res) => {
    try {
        res.sendFile(path.join(PUBLIC, 'reservation.html'));
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// await Ticket.create({ movieName });
router.post('/movieReserve/reservation', async (req, res) => {
    const { movieName } = req.body;
    try {
        console.log(movieName);
        res.sendFile(path.join(PUBLIC, 'seat.html'))
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/movieRead', async (req, res) => {
    try {
        res.send('예매 조회')
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/logout', async (req, res) => {
    try {
        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/movieCancel', async (req, res) => {
    try {
        res.sendFile(path.join(PUBLIC, 'movie.html'));
    } catch (err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;