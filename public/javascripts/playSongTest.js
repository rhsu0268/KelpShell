context = new AudioContext(); // globals make things easier here
source = null;
gain = null;

function playSong() {
  bufferLoader = new BufferLoader(
      context,
      [
        '../music/feeling_good.mp3'
      ],
      finishedLoading // this is the callback function - it's called after the file is loaded
              // and is given an array of loaded buffer arrays as an argument  
  );

  bufferLoader.load();
}

function stopSong() {
  source.stop()
}

function finishedLoading(bufferList) {
  // If you had more loops, you could 
    source = context.createBufferSource();
    source.buffer = bufferList[0];
    gain = context.createGain();
    source.connect(gain);
    gain.gain.value = 0.4;
    gain.connect(context.destination);
    source.start(0);
}