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

app.controller('musicMixerCtrl', ['$scope', 'song', function($scope, song) {

	console.log("music mixer");

	//var context = new AudioContext();
	//var osc = context.createOscillator();






	$scope.playSong = function()
	{
		console.log(song.getSelectedSong());
		//var song = song.getSelectedSong();
		//console.log(song);
		console.log(song.getSelectedSong()[0]);
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

		console.log(songTitle);

		context = new AudioContext();
		bufferLoader = new BufferLoader(
	    	context,
	    	[
		      '../music/' + songTitle + '.mp3'
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


		if (sound != null)
		{
			sound.play()
		}
		else {
			sound = new Pizzicato.Sound({
				source: 'file',
				options: { path: '../music/' + songTitle + '.mp3' }
			}, function() {
				console.log('sound file loaded!');

				sound.play();
			});



		}

	};

	$scope.addLowPassEffect = function()
	{
		var lowPassFilter = new Pizzicato.Effects.LowPassFilter({
			frequency: 400,
			peak: 10
		});

		sound.addEffect(lowPassFilter);
	}

	$scope.addHighPassEffect = function()
	{
		var highPassFilter = new Pizzicato.Effects.HighPassFilter({
		    frequency: 10,
		    peak: 10
		});

		sound.addEffect(highPassFilter);

	}

	$scope.stopEffect = function()
	{
		sound.stop();
		sound = null;
	}

	$scope.pauseEffect = function()
	{
		sound.pause();
	}


	$scope.addStereoPanner = function()
	{
		var stereoPanner = new Pizzicato.Effects.StereoPanner({
		    pan: -1
		});

		sound.addEffect(stereoPanner);

		//sound.addEffect(highPassFilter);

	}

	$scope.addRingModulatorEffect = function()
	{
		var ringModulator = new Pizzicato.Effects.RingModulator({
    		speed: 500,
    		distortion: 10,
    		mix: 0.5
		});

		sound.addEffect(ringModulator);
	}

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
