context = new AudioContext();
console.log(context);


osc = context.createOscillator();
console.log(osc);
osc.frequency.value = 550;
osc.connect(context.destination);

osc.start(0);

osc.stop();
