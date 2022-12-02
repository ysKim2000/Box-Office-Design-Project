const express = require('express');

const router = express.Router();
const movieController = require('../controller/movie')

// 영화 순위 API
router.get('/movieRank', movieController.movieRank);
// 영화 예약 API
router.get('/movieReserve', movieController.movieReserve);
// 영화 예약 시스템 API
router.post('/movieReserve/reservation', movieController.reserveSystem);
// 영화 티켓 조회 API
router.get('/movieRead', movieController.movieRead);
// // 로그아웃 API
// router.post('/logout', movieController.logout);
// 뒤로가기 API
router.post('/back', movieController.back);

// Comment 추가 API
module.exports = router;