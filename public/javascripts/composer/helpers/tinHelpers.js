function playSoundLoop3(tune)
{
    if (contextLoop1 || contextLoop2 || contextLoop4)
    {
        console.log("Another contextLoop is defined");


        // load the sound into the current context loop
        if (contextLoop1)
        {
            loadSource3IntoContext1();
        }


        else if (contextLoop2) {
            console.log("calling loadSource3IntoContext2");
            loadSource3IntoContext2();
        }
        else if (contextLoop4)
        {
            console.log("calling loadSource3IntoContext4");
            loadSource3IntoContext4();
        }


    }
    else
    {
        contextLoop3 = new AudioContext();
        //console.log(contextLoop2);

        bufferLoader = new BufferLoader(
            contextLoop3,
            [
                '../music/tin.wav'
            ],
            finishedLoadingAndPlay3 // this is the callback function - it's called after the file is loaded
            // and is given an array of loaded buffer arrays as an argument
        );
        bufferLoader.load();
    }

}


function finishedLoadingAndPlay3(bufferList) {
    // If you had more loops, you could
    //console.log(bufferList);

    sourceLoop3 = contextLoop3.createBufferSource();
    sourceLoop3.playbackRate.value = playbackRate3;
    sourceLoop3.buffer = bufferList[0];
    gainLoop3 = contextLoop3.createGain();
    sourceLoop3.connect(gainLoop3);
    gainLoop3.gain.value = volume3;
    gainLoop3.connect(contextLoop3.destination);

    sourceLoop3.start(0);
    sourceLoop3.loop = true;

}


function loadSource3IntoContext1()
{
    bufferLoader = new BufferLoader(
        contextLoop1,
        [
          '../music/tin.wav'
        ],
        connectSource3IntoContext1
    );
    bufferLoader.load();
}

function connectSource3IntoContext1(bufferList)
{
    sourceLoop3 = contextLoop1.createBufferSource();
    sourceLoop3.playbackRate.value = playbackRate1;
    sourceLoop3.buffer = bufferList[0];
    gainLoop3 = contextLoop1.createGain();
    sourceLoop3.connect(gainLoop3);
    gainLoop3.gain.value = volume1;
    gainLoop3.connect(contextLoop1.destination);

    sourceLoop3.start(0);
    sourceLoop3.loop = true;
}

function loadSource3IntoContext2()
{
    bufferLoader = new BufferLoader(
        contextLoop2,
        [
          '../music/tin.wav'
        ],
        connectSource3IntoContext2
    );
    bufferLoader.load();
}

function connectSource3IntoContext2(bufferList)
{
    sourceLoop3 = contextLoop2.createBufferSource();
    sourceLoop3.playbackRate.value = playbackRate1;
    sourceLoop3.buffer = bufferList[0];
    gainLoop3 = contextLoop2.createGain();
    sourceLoop3.connect(gainLoop3);
    gainLoop3.gain.value = volume1;
    gainLoop3.connect(contextLoop2.destination);

    sourceLoop3.start(0);
    sourceLoop3.loop = true;
}

function loadSource3IntoContext4()
{
    bufferLoader = new BufferLoader(
        contextLoop4,
        [
          '../music/tin.wav'
        ],
        connectSource3IntoContext4
    );
    bufferLoader.load();
}

function connectSource3IntoContext4(bufferList)
{
    sourceLoop3 = contextLoop4.createBufferSource();
    sourceLoop3.playbackRate.value = playbackRate1;
    sourceLoop3.buffer = bufferList[0];
    gainLoop3 = contextLoop4.createGain();
    sourceLoop3.connect(gainLoop3);
    gainLoop3.gain.value = volume1;
    gainLoop3.connect(contextLoop4.destination);

    sourceLoop3.start(0);
    sourceLoop3.loop = true;
}
