var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'KelpShell' });
});

router.get('/extravagantPieces', function(req, res, next) {
	res.render('extravagantPieces', { title: 'Express' });
});

router.get('/music_mixer', function(req, res, next) {
	res.render('music_mixer', { title: 'Music Mixer' });
});

router.get('/composer', function(req, res, next) {
	res.render('composer', { title: 'Composer' });
});

router.get('/popularMusic', function(req, res, next) {
	res.render('popularMusic', { title: 'Composer' });
});

router.get('/playSongTest', function(req, res, next) {
	res.render('playSongTest', { title: 'Play Song Test' });

});

router.get('/profile', function(req, res, next) {
	res.render('profile', { title: 'Profile' });

});

module.exports = router;
