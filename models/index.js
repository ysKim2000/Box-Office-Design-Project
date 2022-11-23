const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');
const Info = require('./info');
const Client = require('./client')
const Reservation = require('./reservation')

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Comment = Comment;
db.Info = Info;
db.Client = Client;
db.Reservation = Reservation;

User.init(sequelize);
Comment.init(sequelize);
Info.init(sequelize);
Client.init(sequelize);
Reservation.init(sequelize);

User.associate(db);
Comment.associate(db);
Info.associate(db);
Client.associate(db);
Reservation.associate(db);

module.exports = db;


