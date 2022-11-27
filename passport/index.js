const passport = require('passport');
const local = require('./local');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => { //콜백함수를 등록하고 있는 상태
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => { //로그인된 상태
    User.findOne({
      where: { id }
    })
    .then(user => done(null, user))
    .catch(err => done(err));
  });

  local();
};
