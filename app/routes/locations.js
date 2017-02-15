var express = require('express');
var router = express.Router();
var googleMaps = require('@google/maps').createClient({ key: 'AIzaSyBF6qbzipqQknXqkWgntO7yhlgLOocDa_Q' });

router.get('/', function(request, response) {
    response.render('locations.pug', { breadcrumbs: 'Locations' });
});

router.post('/', function(request, response) {
    var lat = request.body.lat;
    var lon = request.body.lon;
    var rankby = request.body.rankby;
    var landmarks = [];
    googleMaps.placesNearby({
        location: [lat, lon],
        // radius: 500,
        rankby: rankby
    }, function(error, body) {
        if (!error) {
            body.json.results.forEach(function (e) {
                landmarks.push(e.name);
            });
            request.session.landmarks = landmarks;
            response.redirect('/landmarks')
        }
    });
});

module.exports = router;