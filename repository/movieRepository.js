const Ticket = require('../models/ticket');

exports.checkTicket = (ticket) => Ticket.findOne({ where: { ticket: ticket } }) ? true : false;

exports.createTicket = (ticket, userId, movieCode, movieName, movieTime, movieSeat) => Ticket.create({ ticket, userId, movieCode, movieName, movieTime, movieSeat });