const Sequelize = require('sequelize');
const User = require('./user');
const Ticket = require('./ticket');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Ticket = Ticket;
db.Comment = Comment;

User.init(sequelize);
Ticket.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Ticket.associate(db);
Comment.associate(db);

module.exports = db;