const commentRepository = require("../repository/commentRepository");
const movieRepository = require("../repository/ticketRepository");

exports.createComment = async (id, movie, comment) => {
    const today = new Date();
    const commentId = id + movie + today.toLocaleString();
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
    const integerHash = func(commentId);
    await commentRepository.createComment(integerHash, id, movie, comment);
};

exports.getMovieComment = async (id) => {
    const ticket = await movieRepository.getTicket(id);
    const movieList = [];
    for (movie of ticket) {
        movieList.push(movie.movieName);
    }
    return new Set(movieList);
};

exports.getMovieName = (movieSet, movie) => {
    const movieList = [...movieSet];
    return movieList[movie - 1];
};

exports.getUserComment = async (id) => {
    const comment = await commentRepository.getUserComment(id);
    return comment;
};
exports.getAllComment = async () => {
    const comment = await commentRepository.getUsersComment();
    return comment;
};

exports.deleteComment = async (commentId) => {
    const result = await commentRepository.deleteComment(commentId);
    return result;
};