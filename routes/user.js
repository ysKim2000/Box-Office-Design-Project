const express = require('express');
const path = require('path');

const USER = require('../app.js');
const router = express.Router();
const PUBLIC = path.join(__dirname, '../public');


router.get('/oneTime', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'userPage.html'));
});

router.get('/oneTime/student', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'student.html'));
});

router.get('/oneTime/attend', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'attend.html'));
});

router.get('/oneTime/album', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'album.html'));
});

router.get('/oneTime/dalant', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'dalant.html'));
});

router.get('/oneTime/notify', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'notify.html'));
});

router.get('/oneTime/student/aid', (req, res) => {
    console.log('test')
    res.send(JSON.stringify(USER.users))
});


module.exports = router;