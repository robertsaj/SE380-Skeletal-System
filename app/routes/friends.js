var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
    response.render('friends.pug', { message: request.flash('loginMessage') });
});

module.exports = router;