const passport = require('passport');

exports.loginWithGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/dashboard',
});

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
};
