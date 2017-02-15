var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function (request, response) {
   response.render('account.pug', { breadcrumbs: 'Account' });
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
}));

router.get('/logout', function (request, response) {
    request.logout();
    response.redirect('/');
});

router.post('/register', passport.authenticate('local-register', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
}));

module.exports = router;