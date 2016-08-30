app.controller('recordCtrl', ['$scope', function($scope) {



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
}]);
