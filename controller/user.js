const userService = require("../service/userService")
const path = require('path');

const PUBLIC = path.join(__dirname, '../views');

exports.signUpPage = (req, res, next) => {
    try {
        res.sendFile(path.join(PUBLIC, "signUp.html"))
    } catch (err) {
        res.send("실패!!!")
    }
};

exports.signUp = async (req, res) => {
    const { id, password, name, birth, gender } = req.body;
    try {
        await userService.createUser(id, password, name, birth, gender)
            .then(() => res.redirect('/'))
            .catch(
                err => {
                    res.send(`이미 존재하는 ${id} 입니다.`);
                    console.log(err);
                }
            );
    } catch (err) {
        res.send('회원가입 실패!!!')
    }
};

exports.login = async (req, res) => {
    const { id, pw } = req.body;
    try {
        const userId = await userService.checkUser(id, pw);
        res.cookie('userId', userId)
        res.sendFile(path.join(PUBLIC, "movie.html"))

    } catch (err) {
        res.send('로그인 실패!!!')
    }
};
