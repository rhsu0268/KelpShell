var express = require('express');
var jwt = require('express-jwt');

var router = express.Router();
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var UserInfo = mongoose.model('UserInfo');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'KelpShell' });
});

router.get('/extravagantPieces', function(req, res, next) {
	res.render('extravagantPieces', { title: 'Express' });
});

router.get('/musicMixer', function(req, res, next) {
	res.render('musicMixer', { title: 'Music Mixer' });
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

router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Login' });

});

/*
router.get('/register', function(req, res, next) {
	res.render('register', { title: 'Register' });

});
*/

router.get('/registerAuth', function(req, res, next) {
	res.render('registerAuth', { title: 'Register' });

});


router.get('/test', function(req, res, next) {
	res.render('pages/index', { title: 'Index' });

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


router.get('/users', function(req, res, next) {

	User.find(function(err, users) {
           if (err)
           {
               return next(err);
           }

           res.json(users);

    });

});

var multer = require('multer');

// set up multer
var storage = multer.diskStorage({ //multers disk storage settings
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req, file, cb) {
		var datetimestamp = Date.now();
		console.log(req.params.id);
		//console.log(file);
		cb(null, req.params.id + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
	}
});

var upload = multer({ //multer settings
				storage: storage
			}).single('file');



//var fields = upload.fields([{userFileId: 'id'}]);

/** API path that will upload the files */
router.post('/upload/:id', function(req, res) {
	//console.log(upload.fields);
	console.log("REQ");
	//console.log(req.params.id);
	//console.log("END");




    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
    });
});



router.post('/userInfo', function(req, res, next) {

    var userInfo = new UserInfo(req.body);

    userInfo.save(function(err, userInfo) {
        if (err)
        {
            return next(err);
        }

        res.json(userInfo);

    });

});



router.get('/userInfo/:userId', function(req, res, next) {

    console.log(req.params.userId);


    UserInfo.find({user: req.params.userId}, function(err, userInfo) {
        if (err)
        {
            return next(err);
        }

		console.log(userInfo);
        res.json(userInfo);

    });


});

router.post('/updateUserInfo', function(req, res, next) {

    console.log(req.body.user);
    console.log(req.body);

    UserInfo.update({ user: req.body.user},
        {$set: {name: req.body.name,
                musicBackground: req.body.musicBackground,
                favoriteGenre: req.body.favoriteGenre,
                favoritePiece: req.body.favoritePiece}}
        , function(err, data) {
        if (err)
        {
            return next(err);
        }

        console.log(data);
        res.json(data)

    });



});

router.get('/userInfoList', function(req, res, next) {

	UserInfo.find(function(err, userInfo) {
           if (err)
           {
               return next(err);
           }

           res.json(userInfo);

    });

});

router.get('/deleteUserInfo', function(req, res, next) {

    UserInfo.remove({}, function(err) {
        if (err)
        {
            return next(err);
        }
    });
        res.send("You have successfully removed all userInfo");


});


module.exports = router;
