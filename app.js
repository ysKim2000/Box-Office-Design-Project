const path = require('path');

const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const nunjucks = require('nunjucks');
const infoRouter = require('./routes/info'); // info 없이 ./routes/ 이면 index가 default임
const users = {"kys":{"pw":"1234", "name":"kim","birth":"2000-04-11","gender":"Man"}};

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

const PUBLIC = path.join(__dirname, 'public');

// menu
app.get('/', (_, res) => res.redirect(301, 'public/index.html'));
app.get('/student', (_, res) => res.sendFile(path.join(PUBLIC, 'user.html')));
app.get('/attend', (_, res) => res.sendFile(path.join(PUBLIC, 'atd.html')));
app.get('/album', (_, res) => res.sendFile(path.join(PUBLIC, 'album.html')));
app.get('/dalant', (_, res) => res.sendFile(path.join(PUBLIC, 'dalant.html')));
app.get('/notify', (_, res) => res.sendFile(path.join(PUBLIC, 'notify.html')));

// user 관리
app.get('/aid', (_, res) => res.send(JSON.stringify(users))) // pw는 안보이게 나중에 리팩토링 해야함

// attendance 관리

// album 관리

// dalant 관리

// notify 관리

// app.use('/info', infoRouter); // info.js 작동

// app.use((req, res, next) => {
//     next('Not found error!')
// });

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
