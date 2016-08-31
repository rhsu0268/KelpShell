function playSoundLoop2(tune)
{
    if (contextLoop1 || contextLoop3 || contextLoop4)
    {
        console.log("Another contextLoop is defined");


        // load the sound into the current context loop
        if (contextLoop1)
        {
            loadSource2IntoContext1();
        }

        else if (contextLoop3) {
            console.log("calling loadSource2IntoContext3");
            loadSource2IntoContext3();
        }
        else
        {
            console.log("calling loadSource2IntoContext4");
            loadSource2IntoContext4();
        }

    }
    else
    {
        contextLoop2 = new AudioContext();
        //console.log(contextLoop2);

        bufferLoader = new BufferLoader(
            contextLoop2,
            [
                '../music/' + tune
            ],
            finishedLoadingAndPlay2 // this is the callback function - it's called after the file is loaded
            // and is given an array of loaded buffer arrays as an argument
        );
        bufferLoader.load();
    }

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

function loadSource2IntoContext1()
{
    bufferLoader = new BufferLoader(
        contextLoop1,
        [
          '../music/snare.wav'
        ],
        connectSource2IntoContext1
    );
    bufferLoader.load();
}

function connectSource2IntoContext1(bufferList)
{
    sourceLoop2 = contextLoop1.createBufferSource();
    sourceLoop2.playbackRate.value = playbackRate1;
    sourceLoop2.buffer = bufferList[0];
    gainLoop2 = contextLoop1.createGain();
    sourceLoop2.connect(gainLoop2);
    gainLoop2.gain.value = volume1;
    gainLoop2.connect(contextLoop1.destination);

    sourceLoop2.start(0);
    sourceLoop2.loop = true;
}

function loadSource2IntoContext3()
{
    bufferLoader = new BufferLoader(
        contextLoop3,
        [
          '../music/snare.wav'
        ],
        connectSource2IntoContext3
    );
    bufferLoader.load();
}

function connectSource2IntoContext3(bufferList)
{
    sourceLoop2 = contextLoop3.createBufferSource();
    sourceLoop2.playbackRate.value = playbackRate1;
    sourceLoop2.buffer = bufferList[0];
    gainLoop2 = contextLoop3.createGain();
    sourceLoop2.connect(gainLoop2);
    gainLoop2.gain.value = volume1;
    gainLoop2.connect(contextLoop3.destination);

    sourceLoop2.start(0);
    sourceLoop2.loop = true;
}

function loadSource2IntoContext4()
{
    bufferLoader = new BufferLoader(
        contextLoop4,
        [
          '../music/snare.wav'
        ],
        connectSource2IntoContext4
    );
    bufferLoader.load();
}

function connectSource2IntoContext4(bufferList)
{
    sourceLoop2 = contextLoop4.createBufferSource();
    sourceLoop2.playbackRate.value = playbackRate1;
    sourceLoop2.buffer = bufferList[0];
    gainLoop2 = contextLoop4.createGain();
    sourceLoop2.connect(gainLoop2);
    gainLoop2.gain.value = volume1;
    gainLoop2.connect(contextLoop4.destination);

    sourceLoop2.start(0);
    sourceLoop2.loop = true;
}
