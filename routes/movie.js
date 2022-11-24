const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');

const router = express.Router();
const PUBLIC = path.join(__dirname, '../views');
const Ticket = require('../models/ticket');
const User = require('../models/user');

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

router.post('/movieReserve/reservation', async (req, res) => {
    try {
        const { movieInfo, movieSeat } = req.body;
        const [movieCode, movieName] = movieInfo.split(",");

        let ticket = "134139093013091";
        const ticketNum = await Ticket.findOne({ where: { ticket } });
        if (ticketNum) {
            next('이미 등록된 자리입니다');
            return;
        }
        var movieTime = "2022-11-23-23:00";

        const movieStr = movieCode + movieTime + movieSeat;
        const hash = await bcrypt.hash(movieStr, 8);

        function func(string) {
            var hash = 5;
            if (string.length == 5) return hash;
            for (i = 5; i < string.length; i++) {
                ch = string.charCodeAt(i);
                hash = ((hash << 5) - hash) + ch;
                hash = hash & hash;
            }
            return hash > 0 ? hash : -hash
        }
        const integerHash = func(hash)

        await Ticket.create({
            ticket: integerHash,
            userId: id,
            movieCode,
            movieName,
            movieTime,
            movieSeat
        });
        // res.redirect('/')
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