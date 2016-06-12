var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/connect_to_firebase', function(req, res, next) {
	res.render('music_list', { title: 'Express' });
});

router.get('/music_mixer', function(req, res, next) {
	res.render('music_mixer', { title: 'Music Mixer' });
});


router.get('/playSongTest', function(req, res, next) {
	res.render('playSongTest', { title: 'Play Song Test' });

});

module.exports = router;
