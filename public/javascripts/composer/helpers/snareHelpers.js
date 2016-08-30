function playSoundLoop2(tune)
{
    contextLoop2 = new AudioContext();

    bufferLoader = new BufferLoader(
        contextLoop2,
        [
          '../music/' + tune
        ],
        finishedLoadingAndPlay2	// this is the callback function - it's called after the file is loaded
                        // and is given an array of loaded buffer arrays as an argument
    );
    bufferLoader.load();

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
