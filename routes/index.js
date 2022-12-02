const express = require('express');
const router = express.Router();

const userController = require('../controller/user')

// 회원가입 페이지
router.get('/signUp', userController.signUpPage);
// 회원가입 API
router.post('/signUp/check', userController.signUp);
//로그인 API
router.post('/', userController.login);

module.exports = router;