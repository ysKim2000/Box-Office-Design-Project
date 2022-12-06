const Ticket = require('../models/ticket');

exports.checkTicket = (ticket) => Ticket.findOne({ where: { ticket: ticket } }) ? true : false;

exports.createTicket = (ticket, userId, movieCode, movieName, movieTime, movieSeat) => Ticket.create({ ticket, userId, movieCode, movieName, movieTime, movieSeat });

exports.getTicket = (id) => Ticket.findAll({ where: { userId: id }, attributes: ['ticket', 'movieCode', 'movieName', 'movieTime', 'movieSeat'] });

exports.deleteTicket = (ticket) => Ticket.destroy({ where: { ticket }});