const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');

// post: '/signup'
exports.createUser = (req, res) => {
  User.find({ email: req.body.email }).then((users) => {
    if (users.length >= 1) {
      return res.status(409).json({ message: 'User exists!' });
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) return res.status(500).json({ error: err });

      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      newUser
        .save()
        .then((result) => res.status(201).json({ message: 'User created', createdUser: result }))
        .catch((e) => res.status(500).json({ error: e }));
    });
  });
};

// delete: '/userId'
exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.userId })
    .then((result) => {
      result.deletedCount > 0
        ? res.status(200).json({ message: 'User was deleted', 'Low-level information': result })
        : res.status(404).json({ message: 'Sorry, specific user not found in DB' });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

// get: login
exports.loginUserGet = (req, res) => res.render('login', {
  pageTitle: 'Login',
  path: '/login',
});

// post: '/login'
exports.loginUserPost = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect('/user/login');

    req.logIn(user, (error) => {
      if (error) return next(error);
      return res.redirect('/user/authSuccess');
    });
  })(req, res, next);
};

// get: '/logout'
exports.logout = (req, res) => {
  req.logout();
  res.redirect('/news');
};

/**
 *  get: '/auth/facebook'
 *
 * I recommend to send this route from browser.
 */
exports.authFacebook = (req, res, next) => {
  passport.authenticate('facebook')(req, res, next);
};

// get: '/auth/facebook/callback'
exports.authFacebookCallback = (req, res, next) => {
  passport.authenticate('facebook', {
    successRedirect: '/user/authSuccess',
    failureRedirect: '/user/login',
  })(req, res, next);
};

exports.authSuccess = (req, res) => {
  res.render('authSuccess', {
    pageTitle: 'Auth Success',
    message: 'Authentication successful !',
    path: '/authSuccess',
  });
};
