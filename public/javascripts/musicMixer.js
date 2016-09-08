var app = angular.module('musicMixer', ['rzModule', 'ngSelectable']);



app.service('song', function() {

	var selectedSong;

        return {
            getSelectedSong: function () {
                return selectedSong;
            },
            setSelectedSong: function(value) {
                selectedSong = value;
            }
        };

});

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

app.controller('musicMixerCtrl', ['$scope', 'song', '$rootScope', function($scope, song, $rootScope) {

	console.log("music mixer");

	//var context = new AudioContext();
	//var osc = context.createOscillator();

	$rootScope.sound;
	var sound;

	$scope.playEffect = function()
	{
		console.log(song.getSelectedSong());
		if (!song.getSelectedSong())
		{
			console.log("You must select a song!");
		}

		var songTitle;
		if (song.getSelectedSong()[0].title == "Feeling Good")
		{
			songTitle = "feeling_good";
		}
		else if (song.getSelectedSong()[0].title == "Uptown Funk")
		{
			songTitle = "uptown_funk";
		}
		else if (song.getSelectedSong()[0].title == "In the Summer")
		{
			songTitle = "in_the_summer";
		}
		else
		{
			songTitle = "all_of_me";
		}


		if ($rootScope.sound != null)
		{
			$rootScope.sound.play()
		}
		else {
			$rootScope.sound = new Pizzicato.Sound({
				source: 'file',
				options: { path: '../music/' + songTitle + '.mp3' }
			}, function() {
				console.log('sound file loaded!');

				$rootScope.sound.play();
			});



		}

	};

	var lowPassFilterFrequency = 350;
	var lowPassFilter;

	var highPassFilterFrequency = 350;
	var highPassFilter;



	$scope.lowPassFilterFrequency = {
		value: 350,
		options: {
			step: 1,
			floor: 350,
			ceil: 2000,
			precision: 1,
			showTicks: false,
			onChange: function(sliderId, modelValue, highValue, pointerType)
			{
				console.log(modelValue);
				lowPassFilterFrequency = modelValue;

			}
		}
	};

	$scope.addLowPassEffect = function()
	{
		lowPassFilter = new Pizzicato.Effects.LowPassFilter({
			frequency: lowPassFilterFrequency,
			peak: 10
		});

		sound.addEffect(lowPassFilter);
	}

	$scope.removeLowPassEffect = function()
	{
		sound.removeEffect(lowPassFilter);
	}

	$scope.highPassFilterFrequency = {
		value: 350,
		options: {
			step: 1,
			floor: 350,
			ceil: 2000,
			precision: 1,
			showTicks: false,
			onChange: function(sliderId, modelValue, highValue, pointerType)
			{
				console.log(modelValue);
				highPassFilterFrequency = modelValue;

			}
		}
	};

	$scope.addHighPassEffect = function()
	{
		highPassFilter = new Pizzicato.Effects.HighPassFilter({
		    frequency: highPassFilterFrequency,
		    peak: 10
		});

		sound.addEffect(highPassFilter);

	};

	$scope.removeHighPassEffect = function()
	{
		console.log("Remove high pass filter effect");
		sound.removeEffect(highPassFilter);
	};



	$scope.stopEffect = function()
	{
		$rootScope.sound.stop();
		sound = null;
	};

	$scope.pauseEffect = function()
	{
		$rootScope.sound.pause();
	};

	$scope.addRingModulatorEffect = function()
	{
		var ringModulator = new Pizzicato.Effects.RingModulator({
    		speed: 500,
    		distortion: 10,
    		mix: 0.5
		});

		sound.addEffect(ringModulator);
	};

}]);


app.controller('otherCtrl', ['$scope', 'song', '$rootScope', function($scope, song, $rootScope) {

	console.log("otherCtrl");

	var stereoPannerValue = 0;
	var stereoPanner;

	$scope.steroPanner = {
		value: 0,
		options: {
			step: .1,
			floor: -1,
			ceil: 1,
			precision: 1,
			showTicks: false,
			onChange: function(sliderId, modelValue, highValue, pointerType)
			{
				console.log(modelValue);
				stereoPannerValue = modelValue;

			}
		}
	};

	$scope.addStereoPanner = function()
	{
		stereoPanner = new Pizzicato.Effects.StereoPanner({
			pan: stereoPannerValue
		});

		console.log(stereoPanner);
		//console.log(sound);

		$rootScope.sound.addEffect(stereoPanner);

	};

	$scope.removeStereoPanner = function()
	{
		$rootScope.sound.removeEffect(stereoPanner);
	};


}]);





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


app.controller('tuneSelectCtrl', ['$scope', 'song', function ($scope, song) {
	$scope.selection = true;
	$scope.selected = [];
	$scope.log = [];
	$scope.tunes = [
	  {title: 'Feeling Good', artist: 'Michael Buble'},
	  {title: 'Uptown Funk', artist: 'Mark Ronson'},
	  {title: 'In the Summer', artist: 'Calvin Harris'},
	  {title: 'All of Me', artist: 'John Legend'}
	];

	$scope.selectionStart = function(selected){

	  $scope.log.push(($scope.log.length+1)+': selection start!');
	  console.log(selected);
	};

	$scope.selectionStop = function(selected){
	  $scope.log.push(($scope.log.length+1)+': items selected: '+selected.length);
	  console.log(selected);
	  song.setSelectedSong(selected);
	  console.log(song.getSelectedSong());
	};
}]);
