const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');

// post: '/signup'
exports.createUser = (req, res) => {
  User.find({ email: req.body.email })
    .then((users) => {
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

        newUser.save()
          .then((result) => res.status(201).json({ message: 'User created', createdUser: result }))
          .catch((e) => res.status(500).json({ error: e }));
      });
    });
};


// post: '/login'
exports.loginUser = (req, res) => {
  User.find({ email: req.body.email })
    .then((users) => {
      if (users.length === 0) return res.status(401).json({ message: 'User not found in DB' });

      bcrypt.compare(req.body.password, users[0].password, (err, isMatch) => {
        if (err) return res.status(500).json({ error: err });
        return res.status(201).json({ user: isMatch });
      });
    })
    .catch((e) => res.status(500).json({ error: e }));
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
