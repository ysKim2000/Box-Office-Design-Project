const movieRepositiry = require("../repository/movieRepository");

exports.createTicket = async (ticket, userId, movieCode, movieName, movieTime, movieSeat) => {
    
    const regex = /^[a-e|A-E|0-5]+$/;
    if (regex.test(movieSeat) == false) throw '잘못된 좌석입니다.'
    
    const isVacant = movieRepositiry.checkTicket(ticket);
    if (!isVacant) throw "이미 등록된 좌석입니다."

    await movieRepositiry.createTicket(ticket, userId, movieCode, movieName, movieTime, movieSeat);
};
