var app = angular.module('composer', []);

var context;
var osc;
var source;
var gain;

var tune;

app.controller('padsCtrl', ['$scope', function($scope) {

    console.log("Pads");

    $scope.playKick = function()
    {
        tune = "kick.wav";
        if (!context)
        {
            playSound(tune);
        }
        else
        {
            source.stop();
            context.close();
            context = null;
        }
    }

    $scope.playSnare = function()
    {
        tune = "snare.wav";
        if (!context)
        {
            playSound(tune);
        }
        else
        {
            source.stop();
            context.close();
            context = null;
        }
    }

    $scope.playTin = function()
    {
        tune = "tin.wav";
        if (!context)
        {
            playSound(tune);
        }
        else
        {
            source.stop();
            context.close();
            context = null;
        }
    }

    $scope.playHat = function()
    {
        tune = "hat.wav";
        if (!context)
        {
            playSound(tune);
        }
        else
        {
            source.stop();
            context.close();
            context = null;
        }
    }

    $scope.playLoop1 = function()
    {
        if (!context)
        {
            console.log("Play loop1");
            playSoundLoop("kick.wav");
        }
        else
        {
            source.stop();
            context.close();
            context = null;
        }
    }

    $scope.playLoop2 = function()
    {
        if (!context)
        {
            console.log("Play loop2");
            playSoundLoop("snare.wav");
        }
        else
        {
            source.stop();
            context.close();
            context = null;
        }
    }


}]);


function playSound(tune)
{
    context = new AudioContext();
    bufferLoader = new BufferLoader(
        context,
        [
          '../music/' + tune
        ],
        finishedLoading	// this is the callback function - it's called after the file is loaded
                        // and is given an array of loaded buffer arrays as an argument
    );

    bufferLoader.load();
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

function playSoundLoop(tune)
{
    context = new AudioContext();
    bufferLoader = new BufferLoader(
        context,
        [
          '../music/' + tune
        ],
        finishedLoadingAndPlay	// this is the callback function - it's called after the file is loaded
                        // and is given an array of loaded buffer arrays as an argument
    );

    bufferLoader.load();
}

function finishedLoadingAndPlay(bufferList) {
    // If you had more loops, you could
    source = context.createBufferSource();
    source.buffer = bufferList[0];
    gain = context.createGain();
    source.connect(gain);
    gain.gain.value = 0.4;
    gain.connect(context.destination);

  	source.start(0);
    source.loop = true;

}
