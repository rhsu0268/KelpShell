function playSoundLoop3(tune)
{
    contextLoop3 = new AudioContext();

    bufferLoader = new BufferLoader(
        contextLoop3,
        [
          '../music/' + tune
        ],
        finishedLoadingAndPlay3	// this is the callback function - it's called after the file is loaded
                        // and is given an array of loaded buffer arrays as an argument
    );
    bufferLoader.load();

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
