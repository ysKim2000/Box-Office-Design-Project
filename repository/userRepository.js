const User = require('../models/user');

exports.createUser = (id, password, name, birth, gender) => User.create({ id, password: password, name, birth, gender });

exports.checkUser = async (id) => await User.findOne({ where: { id: id } });

