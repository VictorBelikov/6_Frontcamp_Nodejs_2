const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// Save in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Find in session
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email }) // Find in DB
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) return done(null, user);
          return done(null, false, { message: 'Incorrect password.' });
        });
      })
      .catch((e) => console.log(e));
  }),
);
