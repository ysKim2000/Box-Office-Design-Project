const Ticket = require('../models/ticket');
const path = require('path');
const PUBLIC = path.join(__dirname, '../views');
const movieService = require("../service/movieService")

exports.movieRank = (req, res, next) => {
    try {
        res.sendFile(path.join(PUBLIC, 'movieRank.html'));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.movieReserve = (req, res, next) => {
    try {
        res.sendFile(path.join(PUBLIC, 'reservation.html'));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.reserveSystem = (req, res) => {
    const { time, movieTime, movieInfo, movieSeat } = req.body;
    const [movieCode, movieName] = movieInfo.split(",");

    try {
        const movieStr = new String(movieCode + time + movieTime + movieSeat).valueOf();
        // 즉시 함수
        function func(string) {
            var hash = 5;
            if (string.length == 5) return hash;
            for (i = 5; i < string.length; i++) {
                ch = string.charCodeAt(i);
                hash = ((hash << 5) - hash) + ch;
                hash = hash & hash;
            }
            return hash > 0 ? hash : -hash
        }
        const integerHash = func(movieStr)
        movieService.createTicket(integerHash, req.cookies.userId, movieCode, movieName, time + " " + movieTime, movieSeat)
            .then(() => res.sendFile(path.join(PUBLIC, 'movie.html')))
            .catch(
                err => {
                    res.send("You can't choose this seat!!!")
                    console.log(err);
                }
            );
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.movieRead = async (req, res) => {
    try {
        const user = await movieService.readTicket(req.cookies.userId);
        console.log(user[1]);
        res.render('ticketRead', {
            title: 'Tickets',
            userTicket: user
        });

    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.logout = (req, res, next) => {
    try {
        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
};


exports.back = (req, res, next) => {
    try {
        res.sendFile(path.join(PUBLIC, 'movie.html'));
    } catch (err) {
        console.error(err);
        next(err);
    }
};