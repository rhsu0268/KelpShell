function playSoundLoop1(tune)
{
    if (contextLoop2 || contextLoop3 || contextLoop4)
    {
        console.log("Another contextLoop is defined");


        // load the sound into the current context loop
        if (contextLoop2)
        {
            loadSource1IntoContext2();
        }
        else if (contextLoop3) {
            //console.log("calling loadSourceIntoContext3");
            loadSource1IntoContext3();
        }
        else
        {
            //console.log("calling loadSourceIntoContext4");
            loadSource1IntoContext4();
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


function loadSource1IntoContext2()
{
    bufferLoader = new BufferLoader(
        contextLoop2,
        [
          '../music/kick.wav'
        ],
        connectSource1IntoContext2
    );
    bufferLoader.load();
}

function connectSource1IntoContext2(bufferList)
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

function loadSource1IntoContext3()
{
    bufferLoader = new BufferLoader(
        contextLoop3,
        [
          '../music/kick.wav'
        ],
        connectSource1IntoContext3
    );
    bufferLoader.load();
}

function connectSource1IntoContext3(bufferList)
{
    sourceLoop1 = contextLoop3.createBufferSource();
    sourceLoop1.playbackRate.value = playbackRate1;
    sourceLoop1.buffer = bufferList[0];
    gainLoop1 = contextLoop3.createGain();
    sourceLoop1.connect(gainLoop1);
    gainLoop1.gain.value = volume1;
    gainLoop1.connect(contextLoop3.destination);

    sourceLoop1.start(0);
    sourceLoop1.loop = true;
}

function loadSource1IntoContext4()
{
    bufferLoader = new BufferLoader(
        contextLoop4,
        [
          '../music/kick.wav'
        ],
        connectSource1IntoContext4
    );
    bufferLoader.load();
}

function connectSource1IntoContext4(bufferList)
{
    sourceLoop1 = contextLoop4.createBufferSource();
    sourceLoop1.playbackRate.value = playbackRate1;
    sourceLoop1.buffer = bufferList[0];
    gainLoop1 = contextLoop4.createGain();
    sourceLoop1.connect(gainLoop1);
    gainLoop1.gain.value = volume1;
    gainLoop1.connect(contextLoop4.destination);

    sourceLoop1.start(0);
    sourceLoop1.loop = true;
}
