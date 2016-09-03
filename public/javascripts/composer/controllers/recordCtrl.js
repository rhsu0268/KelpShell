app.controller('recordCtrl', ['$scope', 'recording', '$rootScope', function($scope, recording, $rootScope) {

    //$scope.startComposing = true;
    //$scope.stopComposing = false;
    $scope.startCompose = false;
    $scope.stopCompose = true;

    var rec;
    var recorder;


    $scope.startRecordAudio = function()
    {


        // create a new audio context
        //var recordingContext = new AudioContext();
        //var source = recordingContext.createBufferSource();
        var context;


        //rec = new Recorder(sourceLoop1);

        var onFail = function(e) {
            console.log('Rejected!', e);
        };

        var onSuccess = function(s) {
            //var context = new webkitAudioContext();
            context = new AudioContext();
            var mediaStreamSource = context.createMediaStreamSource(s);
            recorder = new Recorder(mediaStreamSource);
            recorder.record();
        };

        //rec.record();
        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true}, onSuccess, onFail);
        }
        else
        {
            console.log('navigator.getUserMedia not present');
        }




    }

    $scope.stopRecordAudio = function()
    {
        recorder.stop();

        //rec2.stop();

        recorder.exportWAV(function(blob) {

            console.log("Stopping recording!");
            console.log(blob);

            Recorder.forceDownload(blob, 'output.mp3');



        });
    }

    $scope.startComposing = function()
    {
        //console.log("Start composing");
        //recording.setNotRecordingStatus(false);
        //onsole.log(recording.getNotRecordingStatus());

        $rootScope.notRecording = false;

        $scope.startCompose = true;
        $scope.stopCompose = false;

    }

    $scope.stopComposing = function()
    {
        //console.log("Start composing");
        //recording.setNotRecordingStatus(false);
        //onsole.log(recording.getNotRecordingStatus());

        //$rootScope.notRecording = true;
        $rootScope.notRecording = true;

        $scope.startCompose = false;
        $scope.stopCompose = true;
    }
}]);
