function playSoundLoop1(tune)
{
    if (contextLoop2 || contextLoop3 || contextLoop4)
    {
        console.log("Another contextLoop is defined");


        // load the sound into the current context loop
        if (contextLoop2)
        {



            loadSource1IntoContext();

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

var generalSourceLoop;
var generalContextLoop;
var generalGainLoop;

function loadSourceIntoContext(generalSourceLoop, generalContextLoop, generalGainLoop)
{
    bufferLoader = new BufferLoader(
        generalContextLoop,
        [
          '../music/kick.wav'
        ],
        function(bufferList)
        {
            generalSourceLoop = generalContextLoop.createBufferSource();
            generalSourceLoop.playbackRate.value = playbackRate1;
            generalSourceLoop.buffer = bufferList[0];
            generalGainLoop = generalContextLoop.createGain();
            console.log(generalGainLoop);
            generalSourceLoop.connect(generalGainLoop);
            generalGainLoop.gain.value = volume1;
            generalGainLoop.connect(generalContextLoop.destination);

            generalSourceLoop.start(0);
            console.log(generalSourceLoop);
            generalSourceLoop.loop = true;
        }
    );
    bufferLoader.load();
    //return generalSourceLoop;
}

function loadSource1IntoContext()
{
    bufferLoader = new BufferLoader(
        contextLoop2,
        [
          '../music/kick.wav'
        ],
        connectSource1IntoContext
    );
    bufferLoader.load();
}

function connectSource1IntoContext(bufferList)
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
