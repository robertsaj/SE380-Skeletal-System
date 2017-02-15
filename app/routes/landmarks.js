var express = require('express');
var router = express.Router();

router.get('/', function (request, response) {
    response.render('landmarks.pug',
        {
            breadcrumbs: 'Landmarks',
            landmarks: request.session.landmarks
        });
});

module.exports = router;