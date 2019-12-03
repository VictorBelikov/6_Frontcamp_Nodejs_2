const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/user/login'); // use local strategy
    // return res.redirect('/user/auth/facebook'); // use facebook strategy
  }
};

module.exports = auth;
