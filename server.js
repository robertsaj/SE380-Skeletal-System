//Express server for the Skeletal System
var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var sass = require('node-sass-middleware');

//Database Setup
var dbConfig = require('./config/database');
mongoose.connect(dbConfig.url);

//Passport for Authentication
require('./config/passport')(passport);

//Node Packages
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views/templates');

//Session Setup
app.use(session({
    secret: '{supersecretsecret}',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(sass({
    src: __dirname + '/views/style/sass',
    dest: __dirname +'/views/style/css',
    debug: true,
    force: true,
    outputStyle: 'compressed',
    indentedSyntax: true
}));

//Routing Setup
require('./app/routes')(app, router, passport);

//Start the server
var server = app.listen(8000, function() {
    var host = 'localhost';
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});