var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-register', new LocalStrategy(
        function (username, password, done) {
            process.nextTick(function () {
                User.findOne({username: username}, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        User.create({
                            username: username,
                            password: password
                        });
                    }
                });
            });
        }));

    passport.use('local-login', new LocalStrategy(
        function (username, password, done) {
            User.findOne({username: username}, function (err, user) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                if (!user) {
                    console.log('no user');
                    return done(null, false, request.flash('loginMessage', 'Incorrect username.'));
                }
                if (!user.validPassword(password)) {
                    console.log('wrong password');
                    return done(null, false, request.flash('loginMessage', 'Incorrect username.'));
                }
                return done(null, user);
            });
        }
    ));

};
