// LICENSE : MIT
"use strict";
var context = new AudioContext;
var gainNode = context.createGain();
function createSE(i) {
    var t0 = context.currentTime;
    var osc = context.createOscillator();
    osc.start(t0 + i * 0.5 + 0.5);
    osc.stop(t0 + i * 0.5 + 0.6);
    osc.frequency.value = 100 + Math.random() * 1000;
    return osc;
}
var oscs = [1, 3, 5, 7, 9, 15].map(function (i) {
    return createSE(i);
});
new AudioNodeFlow(oscs)
    .connect(gainNode)
    .connect(context.destination);
