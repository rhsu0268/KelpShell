var app = angular.module('musicMixer', ['rzModule']);


app.factory('auth', ['$http', '$window', function($http, $window) {

    var auth = {};

    auth.saveToken = function(token)
    {
        $window.localStorage['kelpshell-token'] = token;
    }

    auth.getToken = function()
    {
        return $window.localStorage['kelpshell-token'];
    }

    auth.isLoggedIn = function()
    {
        var token = auth.getToken();

        if (token)
        {
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp = Date.now() / 1000;
        }
        else
        {
            return false;
        }

    }

    auth.currentUser = function()
    {
        if (auth.isLoggedIn())
        {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    }

    auth.register = function(user)
    {
        return $http.post('/register', user).success(function(data) {

            auth.saveToken(data.token);

        })
    }


    auth.login = function(user)
    {
        return $http.post('/login', user).success(function(data) {

            auth.saveToken(data.token);

        })
    }

    auth.logOut = function()
    {
        $window.localStorage.removeItem('kelpshell-token');
        $window.location.href = '/';
    }

    return auth;

}]);

app.controller("NavCtrl", ['$scope', 'auth', function($scope, auth) {

    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logout = auth.logOut;

}]);

var context;
var osc;
var source;
var gain;

app.controller('musicMixer', ['$scope', function($scope) {

	console.log("music mixer");

	//var context = new AudioContext();
	//var osc = context.createOscillator();



	$scope.generatePitch300 = function()
	{
		//osc.stop();

		generatePitch(300);
		osc.start(0);
	};

	$scope.generatePitch350 = function()
	{
		//osc.stop();

		generatePitch(350);
		osc.start(0);
	};

	$scope.stopPitch = function()
	{
		if (osc)
		{
			osc.disconnect(context.destination);
			osc.stop();
		}

	};


	$scope.startPitch = function()
	{
		context = new AudioContext();
		osc = context.createOscillator()
		osc.connect(context.destination);
		osc.start(0);
	};

	$scope.slider = {
  		value: 150,
  		options: {
	  		step: 20,
	    	floor: 300,
	    	ceil: 700,
	    	onChange: function(sliderId, modelValue, highValue, pointerType)
	    	{
	    		console.log(modelValue);

	    		generatePitch(modelValue);
				//osc.start(0);
	    	}
  		}
	};

	$scope.playSong = function()
	{
		context = new AudioContext();
		bufferLoader = new BufferLoader(
	    	context,
	    	[
		      '../music/feeling_good.mp3'
		    ],
		    finishedLoading	// this is the callback function - it's called after the file is loaded
		    				// and is given an array of loaded buffer arrays as an argument
		);

	  	bufferLoader.load();
	};

	$scope.stopSong = function()
	{
		source.stop();
	};
}]);


app.controller('bandJS', function($scope) {

	console.log("Inside bandjs");

	$scope.tempo = 180;

	var conductor = new BandJS();

	conductor.setTimeSignature(2, 2);
	conductor.setTempo($scope.tempo);

	var rightHand = conductor.createInstrument('square', 'oscillators');
	var leftHand = conductor.createInstrument('triangle', 'oscillators');
	var drum = conductor.createInstrument('white', 'noises');

	drum.setVolume(50);

	// Bar 1
	rightHand.note('quarter', 'E5, F#4');
	rightHand.note('quarter', 'E5, F#4');
	rightHand.rest('quarter');
	rightHand.note('quarter', 'E5, F#4');


	$scope.playMixedSong = function()
	{
		$scope.playing = true;
        $scope.paused = false;
        player.play();
	}

	var player = conductor.finish();

	$scope.stopMixedSong = function()
	{
		$scope.playing = false;
		$scope.paused = false;
		player.pause();
	}

});

function generatePitch(pitch)
{
	//console.log(context);
	//console.log(osc);
	osc.frequency.value = pitch;
	//osc.connect(context.destination);
}

function finishedLoading(bufferList) {
 	// If you had more loops, you could
  	source = context.createBufferSource();
  	source.buffer = bufferList[0];
  	gain = context.createGain();
  	source.connect(gain);
  	gain.gain.value = 0.4;
  	gain.connect(context.destination);
  	source.start(0);
}

app.controller('mixer', function($scope) {

	console.log("mixer");

	var conductor = new BandJS();

	conductor.setTimeSignature(4, 4);
	conductor.setTempo(120);

	//var instrument = conductor.createInstrument('sine', 'oscillators');
	var instrument = conductor.createInstrument();

	console.log("playE");
    instrument.note('quarter', 'E4');
    instrument.note('quarter', 'F4');
    instrument.note('quarter', 'G4');
    instrument.note('quarter', 'A4');
    instrument.note('quarter', 'B4');
    instrument.note('quarter', 'C4');
    instrument.note('quarter', 'D4');

	$scope.playE = function()
	{
		//$scope.playing = true;
        //$scope.paused = false;

        player.play();
	};


	var player = conductor.finish();

});

app.controller('pad', function($scope) {

	console.log("Pad");

	var context = new AudioContext();




});


// function to load audio files
function loadAudio(object, url)
{
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType =  'arrayBuffer';

	request.onload = function()
	{
		context.decodeAudioData(request.response, function(buffer)
		{
			object.buffer = buffer;
		});
	}
	request.send();
}


// add properties to object
// player
function addAudioProperties(object)
{
	object.name = object.id;
	object.source = $(object).data('sound');
	loadAudio(object, object.source);
	object.play = function()
	{
		var s = context.createBufferSource();
		s.buffer = object.buffer;
		s.connect(context.destination);
		s.start(0);
		object.s = s;
	}
}
