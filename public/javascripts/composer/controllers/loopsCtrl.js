var loop1Playing = false;
var loop2Playing = false;
var loop3Playing = false;
var loop4Playing = false;

app.controller('loopsCtrl', ['$scope', function($scope) {

    $scope.playLoop1 = function()
    {

        if (!contextLoop1 && !loop1Playing)
        {
            console.log("Play loop1");
            playSoundLoop1("kick.wav");
            loop1Playing = true;
        }

        else
        {

            sourceLoop1.stop();
            sourceLoop1 = null;
            loop1Playing = false;
            closeContextLoop();


        }
    }

    $scope.playLoop2 = function()
    {
        if (!contextLoop2 && !loop2Playing)
        {
            console.log("Play loop2");
            playSoundLoop2("snare.wav");
            loop2Playing = true;
            // sourceLoop1 is still not defined if you click this first
        }
        else
        {
            sourceLoop2.stop();
            sourceLoop2 = null;
            loop2Playing = false;

            // make sure that there are no other sources on that context before closing
            closeContextLoop();
        }
    }

    $scope.playLoop3 = function()
    {
        if (!contextLoop3 && !loop3Playing)
        {
            console.log("Play loop3");
            playSoundLoop3("tin.wav");
            loop3Playing = true;
        }
        else
        {
            //console.log("SourceLoop3");

            sourceLoop3.stop();
            sourceLoop3 = null;
            loop3Playing = false;


            closeContextLoop();
        }
    }

    $scope.playLoop4 = function()
    {
        if (!contextLoop4 && !loop4Playing)
        {
            console.log("Play loop4");
            playSoundLoop4("hat.wav");
            loop4Playing = true;
        }
        else
        {
            sourceLoop4.stop();
            sourceLoop4 = null;
            loop4Playing = false;

            closeContextLoop();
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

                if (sourceLoop2)
                {
                    sourceLoop2.playbackRate.value = modelValue;
                }
                playbackRate2 = modelValue;
            }
        }
    };

    $scope.sliderTinFrequency = {
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

                if (sourceLoop3)
                {
                    sourceLoop3.playbackRate.value = modelValue;
                }
                playbackRate3 = modelValue;
            }
        }
    };

    $scope.sliderHatFrequency = {
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

                if (sourceLoop4)
                {
                    sourceLoop4.playbackRate.value = modelValue;
                }
                playbackRate4 = modelValue;
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
        value: 1,
        options: {
            step: 1,
            floor: 1,
            ceil: 10,
            showTicks: true,
            onChange: function(sliderId, modelValue, highValue, pointerType)
            {
                console.log(modelValue);
                if (gainLoop2)
                {
                    gainLoop2.gain.value = modelValue;

                }

                volume2 = modelValue;
            }
        }
    };

    $scope.sliderTinVolume = {
        value: 1,
        options: {
            step: 1,
            floor: 1,
            ceil: 10,
            showTicks: true,
            onChange: function(sliderId, modelValue, highValue, pointerType)
            {
                console.log(modelValue);
                if (gainLoop3)
                {
                    gainLoop3.gain.value = modelValue;

                }

                volume3 = modelValue;
            }
        }
    };

    $scope.sliderHatVolume = {
        value: 1,
        options: {
            step: 1,
            floor: 1,
            ceil: 10,
            showTicks: true,
            onChange: function(sliderId, modelValue, highValue, pointerType)
            {
                console.log(modelValue);

                if (gainLoop4)
                {
                    gainLoop4.gain.value = modelValue;

                }

                volume4 = modelValue;
            }
        }
    };

}]);


function closeContextLoop()
{
    if ((!sourceLoop1 && !sourceLoop2) && (!sourceLoop3 && !sourceLoop4))
    {
        if (contextLoop1)
        {
            contextLoop1.close();
            contextLoop1 = null;
        }
        // close the closeContextLoops
        else if (contextLoop2)
        {
            contextLoop2.close();
            contextLoop2 = null;
        }
        else if (contextLoop3)
        {
            contextLoop3.close();
            contextLoop3 = null;
        }
        else
        {
            contextLoop4.close();
            contextLoop4 = null;
        }
    }
}
