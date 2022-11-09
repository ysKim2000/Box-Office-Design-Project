const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router(); // 라우터를 통해 모듈화함

router.post('/message', (req, res) => {
    res.locals.title = 'Info-Message'; // locals 를 통해 넌적스로 html에 접근 가능
    res.locals.message = req.body.msg;
    res.render("info"); // info.html로 연결
});

// 아무 id가 들어옴 <- get 방식이라 가능함
router.get('/:id', (req, res) => {
    res.locals.title = 'Info-ID';
    res.locals.message = req.params.id;
    res.render("info");
});

router.post('/password', async (req, res) => { // 비동기 처리를 하는 이유: hash 하는데 시간이 오래 걸리기 때문
    global.password = await bcrypt.hash(req.body.password, 12); // 12번 해시 함수
    res.locals.title = 'Encrypted';
    res.locals.message = global.password;
    res.render("info");
});

router.post('/compare', async (req, res) => { // 비동기 처리하는 이유: 위와 동일 
    const auth = await bcrypt.compare(req.body.password, global.password); // global.password 안에 12번 암호화 했다는 정보가 있음
    res.locals.title = 'Auth';
    res.locals.message = auth;
    res.render("info");
});

module.exports = router;
