const express = require('express');
const router = express.Router();

const userController = require('../controller/user')
// 회원가입 페이지
router.get('/', userController.signUpPage);
// 회원가입 API
router.post('/check', userController.signUp);

module.exports = router;