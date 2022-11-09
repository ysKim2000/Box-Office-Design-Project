const express = require('express');
const path = require('path');

const controller = require('../app');
const router = express.Router();
const PUBLIC = path.join(__dirname, '../public/user');


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
    res.send(`${controller.album}`)
});

router.get('/oneTime/notify', (req, res) => {
    res.send(`${controller.noti}`)
});

router.get('/oneTime/student/aid', (req, res) => {
    res.send(JSON.stringify(controller.users))
});

router.get('/oneTime/student/rid', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'stdSearch.html'));
});

router.get('/oneTime/student/rid/search', (req, res) => {
    const id = req.query.id;
    res.send(id in controller.users ? JSON.stringify(controller.users[id]) : `존재하지 않은 ID: ${id}`);
});

router.get('/oneTime/attend', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'attend.html'));
});

router.get('/oneTime/attend/atridAll', (req, res) => {
    let list = []
    for(id in controller.users){
        list.push(`이름: ${controller.users[id].name}, 출결: ${controller.users[id].attendance ? '출석': '결석'}`)
    }
    res.send(list)
});

router.get('/oneTime/attend/atridSingle', (req, res) => {
    const id = req.query.id;
    res.send(id in controller.users ? JSON.stringify(controller.users[id].attendance ? '출석':'결석') : `존재하지 않은 ID: ${id}`);
});


module.exports = router;