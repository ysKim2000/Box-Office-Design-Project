const express = require('express');
const path = require('path');

const router = express.Router();
const PUBLIC = path.join(__dirname, '../views');


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

router.post('/movieReserve/movieSeat', async (req, res) => {
    try {
        res.send('Hi') // 디비 작업하고 저기서 보내는 거 받고 이케 하면 됨
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

router.get('/movieCalcel', async (req, res) => {
    try {
        res.send('예매 취소')
    } catch (err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;