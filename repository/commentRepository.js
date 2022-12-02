const Comment = require('../models/comment');

exports.createComment = (id, movie, comment) => Comment.create({ userId: id, movie, comment });

exports.getUserComment = (id) => Comment.findAll({ where: { userId: id }, attributes: ['comment', 'movie'] });

exports.getUsersComment = () => Comment.findAll({})