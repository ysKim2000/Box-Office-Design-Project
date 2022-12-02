const express = require('express');
const passport = require('passport');
const path = require('path');
const PUBLIC = path.join(__dirname, '../views');
const router = express.Router();

const { logout } = require('./helpers');

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        // if (user) req.login(user, loginError => res.redirect('movie'));
        console.log(user)
        if (user) req.login(user, loginError => res.sendFile(path.join(PUBLIC,'movie.html')));
        // else next(res.write("<script>alert(`Login fail!`)</script>"));
        else next(res.send("Login fail!"));
    })(req, res, next);
});

router.get('/logout', logout);

module.exports = router;
