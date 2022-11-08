const express = require('express');
const router = express.Router(); // 라우터를 통해 모듈화함

router.post('/message', (req, res) => {
    res.locals.title = 'Info-Message';
    res.locals.message = req.body.msg;
    res.render("info");
});

router.get('/:id', (req, res) => {
    res.locals.title = 'Info-ID';
    res.locals.message = req.params.id;
    res.render("info");
});

// 사용자 정보 추가
router.post('/cid', upload.single('image'), (req, res) => {
    const { id, name, birth, gender } = req.body;
    res.send(id in users ? `이미 존재하는 ID: ${id}` : users[id] = { name, birth, gender, 'img': req.file?.path ?? '' });
});

module.exports = router;
