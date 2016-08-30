var app = angular.module('composer', ['rzModule', 'ngFileUpload']);

var context;
var osc;
var source;
var gain;

var contextLoop1;
var contextLoop2;
var contextLoop3;
var contextLoop4;

var sourceLoop1;
var sourceLoop2;
var sourceLoop3;
var sourceLoop4;

var gainLoop1;
var gainLoop2;
var gainLoop3;
var gainLoop4;

var playbackRate1 = 1;
var playbackRate2 = 1;
var playbackRate3 = 1;
var playbackRate4 = 1;

var volume1 = 1;
var volume2 = 1;
var volume3 = 1;
var volume4 = 1;

var tune;



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
