var express = require('express');
var router = express.Router();
var googleMaps = require('@google/maps').createClient({ key: 'AIzaSyBF6qbzipqQknXqkWgntO7yhlgLOocDa_Q' });

router.get('/', function(request, response) {
    response.render('locations.pug', { breadcrumbs: 'Locations' });
});

router.post('/', function(request, response) {
    var lat = request.body.lat;
    var lon = request.body.lon;
    var landmarks = [];
    var outerResponse = response;
    googleMaps.placesNearby({
        location: [lat, lon],
        radius: 500
    }, function(error, response) {
        if (!error) {
            response.json.results.forEach(function (e) {
                landmarks.push(e.name);
            });
            console.log(1, landmarks);
        }
    });
    console.log(2, landmarks);
});

module.exports = router;