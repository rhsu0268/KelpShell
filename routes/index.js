var express = require('express');
var jwt = require('express-jwt');

var router = express.Router();
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

var mongoose = require('mongoose');
var passport = require('passport');


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

router.get('/profile', auth, function(req, res, next) {
	res.render('profile', { title: 'Profile' });

});

router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Login' });

});

router.get('/register', function(req, res, next) {
	res.render('register', { title: 'Register' });

});

router.post('/register', function(req, res, next) {

	if (!req.body.username || !req.body.password)
	{
		return res.status(400).json({message: 'Please fill out all fields'});
	}

	var user = new User();

	user.username = req.body.username;

	user.setPassword(req.body.password);

	user.save(function (err) {
		if (err)
		{
			return next(err);
		}
		return res.json({token: user.generateJWT()});
	});
});

router.post('/login', function(req, res, next) {

	if (!req.body.username || !req.body.password)
	{
		return res.status(400).json({message: 'Please fill out all fields'});
	}

	passport.authenticate('local', function(err, user, info) {
		if (err)
		{
			return next(err);
		}

		if (user)
		{
			return res.json({token: user.generateJWT()});
		}
		else {
			return res.status(400).json(info);
		}
	})(req, res, next);

});

module.exports = router;
