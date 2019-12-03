module.exports = {
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: 'http://localhost:3000/user/auth/facebook/callback',
};
