//var Recorder = npm.require('recorderjs');

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

app.controller("NavCtrl", ['$scope', 'auth', function($scope, auth) {


    //$scope.isLoggedIn = auth.isLoggedIn;

    var loggedIn;


    //$scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logout = auth.logOut;

    if (auth.isLoggedIn)
    {
        $scope.isLoggedIn = function()
        {
            return true;
        }
    }
}]);






app.controller('recordCtrl', ['$scope', function($scope) {



    var rec;
    $scope.startRecordAudio = function()
    {

        /*
        var config =
        {
            workerPath: '../../node_modules/recorderjs/recorderWorker.js'
        }
        */
        rec = new Recorder(sourceLoop1);

        rec.record();

    }

    $scope.stopRecordAudio = function()
    {

        /*
        var config =
        {
            workerPath: '../../node_modules/recorderjs/recorderWorker.js'
        }
        */
        //var rec = new Recorder(sourceLoop1);
        rec.stop();

        rec.exportWAV(function(blob) {

            console.log("Stopping recording!");
            console.log(blob);

            Recorder.forceDownload(blob, 'output.mp3');






        });



        $scope.playAudio = function()
        {
            function getBufferCallback( buffers )
            {
                audioContext = new AudioContext();
                var newSource = audioContext.createBufferSource();
                var newBuffer = audioContext.createBuffer( 2, buffers[0].length, audioContext.sampleRate );
                newBuffer.getChannelData(0).set(buffers[0]);
                newBuffer.getChannelData(1).set(buffers[1]);
                newSource.buffer = newBuffer;
            }
        }
    }
}]);

function playSoundLoop1(tune)
{
    if (contextLoop2 || contextLoop3 || contextLoop4)
    {
        console.log("Another contextLoop is defined");


        // load the sound into the current context loop
        if (contextLoop2)
        {

            bufferLoader = new BufferLoader(
                contextLoop2,
                [
                  '../music/kick.wav'
                ],
                function(bufferList)
                {
                    sourceLoop1 = contextLoop2.createBufferSource();
                    sourceLoop1.playbackRate.value = playbackRate1;
                    sourceLoop1.buffer = bufferList[0];
                    gainLoop1 = contextLoop2.createGain();
                    sourceLoop1.connect(gainLoop1);
                    gainLoop1.gain.value = volume1;
                    gainLoop1.connect(contextLoop2.destination);

                    sourceLoop1.start(0);
                    sourceLoop1.loop = true;
                }
            );
            bufferLoader.load();



        }
    }
    else
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

    sourceLoop2 = contextLoop2.createBufferSource();
    sourceLoop2.playbackRate.value = playbackRate2;
    sourceLoop2.buffer = bufferList[0];
    gainLoop2 = contextLoop2.createGain();
    sourceLoop2.connect(gainLoop2);
    gainLoop2.gain.value = volume2;
    gainLoop2.connect(contextLoop2.destination);

    sourceLoop2.start(0);
    sourceLoop2.loop = true;

}


function finishedLoadingAndPlay3(bufferList) {
    // If you had more loops, you could
    //console.log(bufferList);

    sourceLoop3 = contextLoop3.createBufferSource();
    sourceLoop3.playbackRate.value = playbackRate3;
    sourceLoop3.buffer = bufferList[0];
    gainLoop3 = contextLoop3.createGain();
    sourceLoop3.connect(gainLoop3);
    gainLoop3.gain.value = volume3;
    gainLoop3.connect(contextLoop3.destination);

    sourceLoop3.start(0);
    sourceLoop3.loop = true;

}

function finishedLoadingAndPlay4(bufferList) {
    // If you had more loops, you could
    //console.log(bufferList);

    sourceLoop4 = contextLoop4.createBufferSource();
    sourceLoop4.playbackRate.value = playbackRate4;
    sourceLoop4.buffer = bufferList[0];
    gainLoop4 = contextLoop4.createGain();
    sourceLoop4.connect(gainLoop4);
    gainLoop4.gain.value = volume4;
    gainLoop4.connect(contextLoop4.destination);

    sourceLoop4.start(0);
    sourceLoop4.loop = true;

}

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
