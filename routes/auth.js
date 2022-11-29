const express = require('express');
const passport = require('passport');
const path = require('path');
const PUBLIC = path.join(__dirname, '../views');
const router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        // if (user) req.login(user, loginError => res.redirect('/movie.html'));
        if (user) req.login(user, loginError => res.sendFile(path.join(PUBLIC, "movie.html")));
        else next(res.write("<script>alert(`Login fail!`)</script>"));
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
