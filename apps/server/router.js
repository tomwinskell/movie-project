const Authentication = require('./controllers/authentication');
const WatchList = require('./controllers/watchList');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.post('/auth/signup', Authentication.signup);
  app.post('/auth/signin', requireSignin, Authentication.signin);
  app.get('/success', requireAuth, (req, res) => res.send('Successful login.'));
  app.get('/auth/current_user', requireAuth, Authentication.currentUser);
};
