module.exports = function(app, passport) {

    app.get('/', function(request, response) {
        response.render('index.ejs', { message: request.flash('loginMessage') });
    });

    app.post('/register', passport.authenticate('local-register', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));

    app.post('/login', passport.authenticate('local-login', { successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true })
    );

    app.get('/home', isLoggedIn, function(request, response) {
        response.render('home.ejs');
    });

    function isLoggedIn(request, response, next) {
        if (request.isAuthenticated()) {
            return next;
        }
        response.redirect('/');
    }

};