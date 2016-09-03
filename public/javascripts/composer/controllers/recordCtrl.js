app.controller('recordCtrl', ['$scope', 'recording', '$rootScope', function($scope, recording, $rootScope) {

    //$scope.startComposing = true;
    //$scope.stopComposing = false;
    $scope.startCompose = false;
    $scope.stopCompose = true;

    var rec;
    $scope.startRecordAudio = function()
    {
        rec = new Recorder(sourceLoop1);

        rec.record();

    }

    $scope.stopRecordAudio = function()
    {
        rec.stop();

        rec.exportWAV(function(blob) {

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
