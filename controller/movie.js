const movieService = require("../service/movieService")

exports.movieRank = (req, res, next) => {
    try {
        res.render('movieRank')
    } catch (err) {
        res.send("실패!!!")
    }
};

exports.movieReserve = (req, res, next) => {
    try {
        res.render('reservation');
    } catch (err) {
        res.send("실패!!!")
    }
};

exports.reserveSystem = (req, res) => {
    const { time, movieTime, movieInfo, movieSeat } = req.body;
    const [movieCode, movieName] = movieInfo.split(",");
    try {
        const movieStr = new String(movieCode + time + movieTime + movieSeat).valueOf();
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
            .then(() => res.render('movie', { name: req.cookies.userId }))
            .catch(
                err => {
                    res.send("You can't choose this seat!!!")
                    console.log(err);
                }
            );
    } catch (err) {
        res.send("예매 실패!!")
    }
};

exports.movieRead = async (req, res) => {
    try {
        const user = await movieService.readTicket(req.cookies.userId);
        res.render('ticketRead', {
            title: 'Tickets',
            userTicket: user
        });

    } catch (err) {
        res.send('티켓 정보가 없습니다.');
    }
};

exports.logout = (req, res, next) => {
    try {
        res.clearCookie('userId')
        res.redirect('/');
    } catch (err) {
        res.send("실패!!!")
    }
};

exports.back = (req, res, next) => {
    try {
        res.render('movie', {name: req.cookies.userId})
    } catch (err) {
        res.send("실패!!!")
    }
};