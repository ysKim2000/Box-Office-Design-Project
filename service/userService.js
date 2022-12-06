const userRepository = require("../repository/userRepository");
const bcrypt = require('bcrypt');

exports.createUser = async (id, password, name, birth, gender) => {
    const user = userRepository.checkUser(id);
    if (!user) throw `이미 존재하는 ${id}`
    const hash = await bcrypt.hash(password, 8);
    await userRepository.createUser(id, hash, name, birth, gender);
};

exports.checkUser = async (id, pw) => {
    const user = await userRepository.checkUser(id);
    const match = await bcrypt.compare(pw, user.password);
    if (user) {
        if (match) return id
        else next();
    } else next();
};