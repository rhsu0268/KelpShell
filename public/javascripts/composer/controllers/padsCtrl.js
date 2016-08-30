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
            sourceLoop2.stop();
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
            sourceLoop3.stop();
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
            sourceLoop4.stop();
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
