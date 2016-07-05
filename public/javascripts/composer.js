var app = angular.module('composer', ['rzModule']);

var context;
var osc;
var source;
var gain;

var contextLoop1;
var contextLoop2;
var contextLoop3;
var contextLoop4;

var sourceLoop1;

var gainLoop1;

var playbackRate1 = 1;
var volume1 = 1;

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
        if (!contextLoop1)
        {
            console.log("Play loop1");
            playSoundLoop1("kick.wav");
        }
        else
        {
            sourceLoop1.stop();
            contextLoop1.close();
            contextLoop1 = null;
        }
    }

    $scope.playLoop2 = function()
    {
        if (!contextLoop2)
        {
            console.log("Play loop2");
            playSoundLoop2("snare.wav");
        }
        else
        {
            source.stop();
            contextLoop2.close();
            contextLoop2 = null;
        }
    }

    $scope.playLoop3 = function()
    {
        if (!contextLoop3)
        {
            console.log("Play loop3");
            playSoundLoop3("tin.wav");
        }
        else
        {
            source.stop();
            contextLoop3.close();
            contextLoop3 = null;
        }
    }

    $scope.playLoop4 = function()
    {
        if (!contextLoop4)
        {
            console.log("Play loop4");
            playSoundLoop4("hat.wav");
        }
        else
        {
            source.stop();
            contextLoop4.close();
            contextLoop4 = null;
        }
    }

    $scope.sliderKickFrequency = {
        value: 1,
        options: {
            step: .1,
            floor: 1,
            ceil: 2,
            precision: 1,
            showTicks: true,
            onChange: function(sliderId, modelValue, highValue, pointerType)
            {
                console.log(modelValue);
                if (sourceLoop1)
                {
                    sourceLoop1.playbackRate.value = modelValue;
                }
                playbackRate1 = modelValue;
            }
        }
    };

    $scope.sliderSnareFrequency = {
        value: 150,
        options: {
            step: 20,
            floor: 300,
            ceil: 700,
            onChange: function(sliderId, modelValue, highValue, pointerType)
            {
                console.log(modelValue);

                //generatePitch(modelValue);
                //osc.start(0);
            }
        }
    };

    $scope.sliderTinFrequency = {
        value: 150,
        options: {
            step: 20,
            floor: 300,
            ceil: 700,
            onChange: function(sliderId, modelValue, highValue, pointerType)
            {
                console.log(modelValue);

                //generatePitch(modelValue);
                //osc.start(0);
            }
        }
    };

    $scope.sliderHatFrequency = {
        value: 150,
        options: {
            step: 20,
            floor: 300,
            ceil: 700,
            onChange: function(sliderId, modelValue, highValue, pointerType)
            {
                console.log(modelValue);

                //generatePitch(modelValue);
                //osc.start(0);
            }
        }
    };

    $scope.sliderKickVolume = {
        value: 1,
        options: {
            step: 1,
            floor: 1,
            ceil: 10,
            showTicks: true,
            onChange: function(sliderId, modelValue, highValue, pointerType)
            {
                console.log(modelValue);
                if (gainLoop1)
                {
                    gainLoop1.gain.value = modelValue;

                }

                volume1 = modelValue;
            }
        }
    };

    $scope.sliderSnareVolume = {
        value: 150,
        options: {
            step: 20,
            floor: 300,
            ceil: 700,
            onChange: function(sliderId, modelValue, highValue, pointerType)
            {
                console.log(modelValue);

                //generatePitch(modelValue);
                //osc.start(0);
            }
        }
    };

    $scope.sliderTinVolume = {
        value: 150,
        options: {
            step: 20,
            floor: 300,
            ceil: 700,
            onChange: function(sliderId, modelValue, highValue, pointerType)
            {
                console.log(modelValue);

                //generatePitch(modelValue);
                //osc.start(0);
            }
        }
    };

    $scope.sliderHatVolume = {
        value: 150,
        options: {
            step: 20,
            floor: 300,
            ceil: 700,
            onChange: function(sliderId, modelValue, highValue, pointerType)
            {
                console.log(modelValue);

                //generatePitch(modelValue);
                //osc.start(0);
            }
        }
    };




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

function playSoundLoop1(tune)
{
    contextLoop1 = new AudioContext();

    bufferLoader = new BufferLoader(
        contextLoop1,
        [
          '../music/' + tune
        ],
        finishedLoadingAndPlay1	// this is the callback function - it's called after the file is loaded
                        // and is given an array of loaded buffer arrays as an argument
    );
    bufferLoader.load();

}

function playSoundLoop2(tune)
{
    contextLoop2 = new AudioContext();

    bufferLoader = new BufferLoader(
        contextLoop2,
        [
          '../music/' + tune
        ],
        finishedLoadingAndPlay2	// this is the callback function - it's called after the file is loaded
                        // and is given an array of loaded buffer arrays as an argument
    );
    bufferLoader.load();

}

function playSoundLoop3(tune)
{
    contextLoop3 = new AudioContext();

    bufferLoader = new BufferLoader(
        contextLoop3,
        [
          '../music/' + tune
        ],
        finishedLoadingAndPlay3	// this is the callback function - it's called after the file is loaded
                        // and is given an array of loaded buffer arrays as an argument
    );
    bufferLoader.load();

}

function playSoundLoop4(tune)
{
    contextLoop4 = new AudioContext();

    bufferLoader = new BufferLoader(
        contextLoop4,
        [
          '../music/' + tune
        ],
        finishedLoadingAndPlay4	// this is the callback function - it's called after the file is loaded
                        // and is given an array of loaded buffer arrays as an argument
    );
    bufferLoader.load();

}


function finishedLoadingAndPlay1(bufferList) {
    // If you had more loops, you could
    //console.log(bufferList);

    sourceLoop1 = contextLoop1.createBufferSource();
    sourceLoop1.playbackRate.value = playbackRate1;
    sourceLoop1.buffer = bufferList[0];
    gainLoop1 = contextLoop1.createGain();
    sourceLoop1.connect(gainLoop1);
    gainLoop1.gain.value = volume1;
    gainLoop1.connect(contextLoop1.destination);

    sourceLoop1.start(0);
    sourceLoop1.loop = true;
}


function finishedLoadingAndPlay2(bufferList) {
    // If you had more loops, you could
    //console.log(bufferList);

    source = contextLoop2.createBufferSource();
    source.buffer = bufferList[0];
    gain = contextLoop2.createGain();
    source.connect(gain);
    gain.gain.value = 0.4;
    gain.connect(contextLoop2.destination);

    source.start(0);
    source.loop = true;

}


function finishedLoadingAndPlay3(bufferList) {
    // If you had more loops, you could
    //console.log(bufferList);

    source = contextLoop3.createBufferSource();
    source.buffer = bufferList[0];
    gain = contextLoop3.createGain();
    source.connect(gain);
    gain.gain.value = 0.4;
    gain.connect(contextLoop3.destination);

    source.start(0);
    source.loop = true;

}

function finishedLoadingAndPlay4(bufferList) {
    // If you had more loops, you could
    //console.log(bufferList);

    source = contextLoop4.createBufferSource();
    source.buffer = bufferList[0];
    gain = contextLoop4.createGain();
    source.connect(gain);
    gain.gain.value = 0.4;
    gain.connect(contextLoop4.destination);

    source.start(0);
    source.loop = true;

}
