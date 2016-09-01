function playSoundLoop4(tune)
{
    if (contextLoop1 || contextLoop2 || contextLoop3)
    {
        console.log("Another contextLoop is defined");


        // load the sound into the current context loop
        if (contextLoop1)
        {
            loadSource4IntoContext1();
        }

        else if (contextLoop2) {
            //console.log("calling loadSourceIntoContext3");
            loadSource4IntoContext2();
        }
        else if (contextLoop3)
        {
            //console.log("calling loadSourceIntoContext4");
            loadSource4IntoContext3();
        }

    }
    else
    {
        contextLoop4 = new AudioContext();

        bufferLoader = new BufferLoader(
            contextLoop4,
            [
                '../music/hat.wav'
            ],
            finishedLoadingAndPlay4	// this is the callback function - it's called after the file is loaded
            // and is given an array of loaded buffer arrays as an argument
        );
        bufferLoader.load();
    }

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

function loadSource4IntoContext1()
{
    bufferLoader = new BufferLoader(
        contextLoop1,
        [
          '../music/tin.wav'
        ],
        connectSource4IntoContext1
    );
    bufferLoader.load();
}

function connectSource4IntoContext1(bufferList)
{
    sourceLoop4 = contextLoop1.createBufferSource();
    sourceLoop4.playbackRate.value = playbackRate1;
    sourceLoop4.buffer = bufferList[0];
    gainLoop4 = contextLoop1.createGain();
    sourceLoop4.connect(gainLoop4);
    gainLoop4.gain.value = volume1;
    gainLoop4.connect(contextLoop1.destination);

    sourceLoop4.start(0);
    sourceLoop4.loop = true;
}

function loadSource4IntoContext2()
{
    bufferLoader = new BufferLoader(
        contextLoop2,
        [
          '../music/tin.wav'
        ],
        connectSource4IntoContext2
    );
    bufferLoader.load();
}

function connectSource4IntoContext2(bufferList)
{
    sourceLoop4 = contextLoop2.createBufferSource();
    sourceLoop4.playbackRate.value = playbackRate1;
    sourceLoop4.buffer = bufferList[0];
    gainLoop4 = contextLoop2.createGain();
    sourceLoop4.connect(gainLoop4);
    gainLoop4.gain.value = volume1;
    gainLoop4.connect(contextLoop2.destination);

    sourceLoop4.start(0);
    sourceLoop4.loop = true;
}

function loadSource4IntoContext3()
{
    bufferLoader = new BufferLoader(
        contextLoop3,
        [
          '../music/tin.wav'
        ],
        connectSource4IntoContext3
    );
    bufferLoader.load();
}

function connectSource4IntoContext3(bufferList)
{
    sourceLoop4 = contextLoop3.createBufferSource();
    sourceLoop4.playbackRate.value = playbackRate1;
    sourceLoop4.buffer = bufferList[0];
    gainLoop4 = contextLoop3.createGain();
    sourceLoop4.connect(gainLoop4);
    gainLoop4.gain.value = volume1;
    gainLoop4.connect(contextLoop3.destination);

    sourceLoop4.start(0);
    sourceLoop4.loop = true;
}
