//Express server for the Skeletal System
var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var app = express();

//Database Setup
var dbConfig = require('./config/database');
mongoose.connect(dbConfig.url);

//Node Packages
app.use(morgan('dev'));
app.use(cookieParser());

app.set('view engine', 'pug');

//Passport for Authentication
var passport = require('passport');
require('./config/passport')(passport);

//Session Setup
app.use(session({secret: '{supersecretsecret}', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Routing Setup
require('./app/routes')(app, passport);

//Start the server
var server = app.listen(8000, function() {
    var host = 'localhost';
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});
