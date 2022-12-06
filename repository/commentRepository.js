const Comment = require('../models/comment');

exports.createComment = (commentId, id, movie, comment) => Comment.create({ commentId, userId: id, movie, comment });

exports.getUserComment = (id) => Comment.findAll({ where: { userId: id }, attributes: ['commentId', 'comment', 'movie'] });

exports.getUsersComment = () => Comment.findAll({});

exports.deleteComment = (commentId) => Comment.destroy({ where: { commentId }});