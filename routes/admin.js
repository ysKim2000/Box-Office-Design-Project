const express = require('express');
const path = require('path');

const router = express.Router();
const admin = {"kys":{"pw":"1234"}};
const PUBLIC = path.join(__dirname, '../public/admin');
const controller = require('../app');


router.get('/adminLogin', (req, res) => {
    const id = req.query.id
    const pw = req.query.pw
    if (id in admin){
        if (pw == admin[id].pw){
            res.sendFile(path.join(PUBLIC, 'adminPage.html'));
        }
    }
});

router.get('/adminLogin/student', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'student.html'));
});

router.get('/adminLogin/student/aid', (req, res) => {
    res.send(JSON.stringify(controller.users))
});

router.get('/adminLogin/student/cid', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'stdCreate.html'));
});

router.get('/adminLogin/student/cid/create', (req, res) => {
    let id = req.query.id
    let name = req.query.name
    let birth = req.query.birth
    let gender = req.query.gender
    controller.users[id] = { name, birth, gender};
    res.send('추가 완료')
});

router.get('/adminLogin/student/uid', (req, res) => {
    console.log('test')
    res.sendFile(path.join(PUBLIC, 'stdUp.html'));
});

router.get('/adminLogin/student/uid/update', (req, res) => {
    let id = req.query.id
    let name = req.query.name
    let birth = req.query.birth
    let gender = req.query.gender

    if (!name) name = controller.users[id].name
    if (!birth) birth = controller.users[id].birth
    if (!gender) gender = controller.users[id].gender
    res.send(id in controller.users ? controller.users[id] = { name, birth, gender } : `존재하지 않은 ID: ${id}`);
});
router.get('/adminLogin/student/rid', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'stdSearch.html'));
});

router.get('/adminLogin/student/rid/search', (req, res) => {
    const id = req.query.id;
    res.send(id in controller.users ? JSON.stringify(controller.users[id]) : `존재하지 않은 ID: ${id}`);
});

router.get('/adminLogin/student/did', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'stdDel.html'));
});

router.get('/adminLogin/student/did/delete', (req, res) => {
    const id = req?.query?.id;
    if (id in controller.users) {
        delete controller.users[id];
    }
    res.send('삭제 완료')
});

router.get('/adminLogin/attend', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'attend.html'));
});

router.get('/adminLogin/attend/atridAll', (req, res) => {
    let list = []
    for(id in controller.users){
        list.push(`이름: ${controller.users[id].name}, 출결: ${controller.users[id].attendance ? '출석': '결석'}`)
    }
    res.send(list)
});
router.get('/adminLogin/attend/atridSingle', (req, res) => {
    const id = req.query.id;
    res.send(id in controller.users ? JSON.stringify(controller.users[id].attendance ? '출석':'결석') : `존재하지 않은 ID: ${id}`);
});

router.get('/adminLogin/album', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'album.html'));
});

router.get('/adminLogin/album/al', (req, res) => {
    const al = req.query.al;
    controller.album.push(al) 
    res.send('추가되었습니다.');
});

router.get('/adminLogin/dalant', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'dalant.html'));
});

router.get('/adminLogin/dalant/dal', (req, res) => {
    const id = req.query.id;
    res.send(id in controller.users ? controller.users[id].dalant+=100 : `존재하지 않은 ID: ${id}`);
});

router.get('/adminLogin/notify', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'noti.html'));
});

router.get('/adminLogin/notify/no', (req, res) => {
    const al = req.query.al;
    controller.noti.push(al) 
    res.send('추가되었습니다.');
});


module.exports = router;
