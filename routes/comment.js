const express = require('express');

const router = express.Router();
const commentController = require('../controller/comment')

// Comment 페이지
router.post('/commentPage', commentController.commentPage);
// Comment 추가 API
router.post('/commentAdd', commentController.commentAdd);
// Comment 조회 페이지
router.post('/commentRead', commentController.commentReadPage);
// User Comment 조회 API
router.get('/commentRead/userComment', commentController.userComment);
// All Comment 조회 API
router.get('/commentRead/allComment', commentController.allComment);

module.exports = router;