var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
    response.render('index.pug', { breadcrumbs: 'Social Augmented Reality' } );
});

module.exports = router;