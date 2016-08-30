function playSoundLoop4(tune)
{
    contextLoop4 = new AudioContext();

    bufferLoader = new BufferLoader(
        contextLoop4,
        [
          '../music/' + tune
        ],
        finishedLoadingAndPlay4	// this is the callback function - it's called after the file is loaded
                        // and is given an array of loaded buffer arrays as an argument
    );
    bufferLoader.load();

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
