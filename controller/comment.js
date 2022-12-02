const commentService = require("../service/commentService")

exports.commentPage = async (req, res, next) => {
    try { 
        res.render('comment', { ticket: await commentService.getMovieComment(req.cookies.userId)})
    } catch (err) {
        res.send("실패!!!")
    }
};

exports.commentAdd = async (req, res, next) => {
    const { movie, comment } = req.body;
    const id = req.cookies.userId
    const movieSet = await commentService.getMovieComment(req.cookies.userId);
    try {
        const movieName = commentService.getMovieName(movieSet, movie)
        await commentService.createComment(id, movieName, comment)
            .then(() => res.render('movie', { name: id }))
    } catch (err) {
        res.send(err)
    }
};

exports.commentReadPage = async (req, res, next) => {
    try {
        res.render('commentRead', { name: req.cookies.userId })
    } catch (err) {
        res.send("실패!!!")
    }
};

exports.userComment = async (req, res, next) => {
    try {
        const userComment = await commentService.getUserComment(req.cookies.userId)
        res.render('commentUser', { comments: userComment })
    } catch (err) {
        res.send(err)
    }
};

exports.allComment = async (req, res, next) => {
    try {
        const usersComment = await commentService.getAllComment()
        res.render('commentAll', { comments: usersComment })
    } catch (err) {
        res.send(err)
    }
};