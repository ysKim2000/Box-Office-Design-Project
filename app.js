const path = require('path');

const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const nunjucks = require('nunjucks');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
exports.users = { "kys": { "name": "kim", "birth": "2000-04-11", "gender": "Man", "attendance": true, "dalant": 100 }, "kyh": { "name": "김승현", "birth": "미상", "gender": "Man", "attendance": false, "dalant": 100} };
exports.album = ['김윤서 사진', '김승현 사진', '김원빈 교수님 사진'];
exports.noti = ['아무말', '안녕하세요']
dotenv.config();

const app = express();
app.set('port', process.env.PORT || 3000);

app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
    express: app,
    watch: true
});

app.use(
    morgan('dev'),
    express.static(path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded({ extended: false }),
    cookieParser(process.env.SECRET),
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET,
        cookie: {
            httpOnly: true,
            secure: false
        },
        name: 'session-cookie'
    })
);

// const PUBLIC = path.join(__dirname, 'public');

// login
app.get('/', (_, res) => res.redirect(301, 'public/index.html'));
app.use('/admin', adminRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    next('Not found error!')
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
