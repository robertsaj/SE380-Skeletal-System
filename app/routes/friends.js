var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
    response.render('friends.pug', { breadcrumbs: 'Friends' });
});

module.exports = router;