const ticketRepository = require("../repository/ticketRepository");

exports.createTicket = async (ticket, userId, movieCode, movieName, movieTime, movieSeat) => {
    const regex = /^[a-e|A-E|0-5]+$/;
    if (regex.test(movieSeat) == false) throw '잘못된 좌석입니다.'

    const isVacant = ticketRepository.checkTicket(ticket);
    if (!isVacant) throw "이미 등록된 좌석입니다."
    console.log("예매되었습니다.");
    await ticketRepository.createTicket(ticket, userId, movieCode, movieName, movieTime, movieSeat);
};

exports.readTicket = async (id) => {
    const user = await ticketRepository.getTicket(id);
    return user
};