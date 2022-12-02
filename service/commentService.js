const commentRepository = require("../repository/commentRepository");
const movieRepository = require("../repository/ticketRepository");

exports.createComment = async (id, movie, comment) => {
    await commentRepository.createComment(id, movie, comment);
};

exports.getMovieComment = async (id) => {
    const ticket = await movieRepository.getTicket(id);
    const movieList = [];
    for(movie of ticket){
        movieList.push(movie.movieName);
    }
    return new Set(movieList);
};

exports.getMovieName = (movieSet, movie) => {
    const movieList = [...movieSet];
    return movieList[movie-1];
};

exports.getUserComment = async (id) => {
    const comment = await commentRepository.getUserComment(id);
    return comment
}
exports.getAllComment = async () => {
    const comment = await commentRepository.getUsersComment();
    return comment
}