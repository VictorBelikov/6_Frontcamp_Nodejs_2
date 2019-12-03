const facebookConfig = require('../config/facebook-config');

const auth = (req, res, next) => {
  if (req.isAuthenticated() || facebookConfig.isAuthenticated) {
    next();
  } else {
    return res.redirect('/user/login'); // local strategy
    // return res.redirect('/user/auth/facebook'); // facebook strategy
  }
};

module.exports = auth;
