const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const facebookConfig = require('./facebook-config');

const User = require('../models/user');

// Save in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

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

passport.use(new FacebookStrategy({
  clientID: facebookConfig.clientID,
  clientSecret: facebookConfig.clientSecret,
  callbackURL: facebookConfig.callbackURL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ facebookId: profile.id });

    // It doesn't matter user exists or we'll create a new one.
    // If the exception hasn't been thrown, so, we're authenticated.
    facebookConfig.isAuthenticated = true;

    if (existingUser) {
      return done(null, existingUser);
    }

    // Of course, we need to request a password from the user. '123' - it's just for example.
    bcrypt.hash('123', 10, async (err, hash) => {
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        facebookId: profile.id,
        name: 'Facebook User 1',
        email: 'example2@yandex.ru',
        password: hash,
      });

      await newUser.save();
      done(null, newUser);
    });

  } catch (e) {
    facebookConfig.isAuthenticated = false; // Over insurance :).
    done(e, false, e.message);
  }
}));
