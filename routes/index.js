const express = require('express');
const router = express.Router();

const userController = require('../controller/user')

//로그인 API
router.post('/movie', userController.login);

module.exports = router;