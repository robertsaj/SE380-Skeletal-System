module.exports = function(app, router) {

    router.use(function(request, response, next) {
        next();
    });

    var index = require('./routes/index');
    app.use('/', index);

    var account = require('./routes/account');
    app.use('/account', account);

    var landmarks = require('./routes/landmarks');
    app.use('/landmarks', landmarks);

    var locations = require('./routes/locations');
    app.use('/locations', locations);

    var friends = require('./routes/friends');
    app.use('/friends', friends);

};