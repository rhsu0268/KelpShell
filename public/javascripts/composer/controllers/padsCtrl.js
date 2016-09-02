app.service('recording', function() {

	var notRecording;

        return {
            getNotRecordingStatus: function () {
                return notRecording;
            },
            setNotRecordingStatus: function(value) {
                notRecording = value;
            }
        };

});

app.controller('padsCtrl', ['$scope', 'recording', '$rootScope', function($scope, recording, $rootScope) {

    // disable the button
    //recording.setNotRecordingStatus(true);
    //$scope.notRecording = recording.getNotRecordingStatus();

	//$scope.notRecording = recording.getNotRecordingStatus();

	$rootScope.notRecording = true;
	console.log($scope.notRecording);

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


}]);
