"use strict";

var assert = require("assert");

require("../lib/audio-node-flow");

describe("audio-node-flow", function () {
    var audioContext;
    beforeEach(function () {
        audioContext = new AudioContext();
    });
    describe("connect", function () {
        context("(node: AudioNode): AudioNodeFlow", function () {
            it("should connect the source to a node", function () {
                var osc1 = audioContext.createOscillator();
                var gain1 = audioContext.createGain();
                var flow = new AudioNodeFlow(osc1);

                osc1.$id = "osc0";
                gain1.$id = "gain0";

                var result = flow.connect(gain1).connect(audioContext.destination);

                assert(result instanceof AudioNodeFlow);

                assert.deepEqual(audioContext.toJSON(), {
                    name: "AudioDestinationNode",
                    inputs: [
                        {
                            name: "GainNode#gain0",
                            gain: {
                                value: 1,
                                inputs: []
                            },
                            inputs: [
                                {
                                    name: "OscillatorNode#osc0",
                                    type: "sine",
                                    frequency: {
                                        value: 440,
                                        inputs: []
                                    },
                                    detune: {
                                        value: 0,
                                        inputs: []
                                    },
                                    inputs: []
                                }
                            ]
                        }
                    ]
                });
            });
        });
    });
    describe("connectAll", function () {
        context("(nodeList: AudioNode[]): AudioNodeFlow", function () {
            it("should connect the source to nodeList", function () {
                var osc1 = audioContext.createOscillator();
                var osc2 = audioContext.createOscillator();
                var gain1 = audioContext.createGain();
                var gain2 = audioContext.createGain();

                osc1.$id = "osc1";
                osc1.frequency.value = 660;
                osc2.$id = "osc2";
                osc2.frequency.value = 880;
                gain1.$id = "gain1";
                gain1.gain.value = 0.5;
                gain2.$id = "gain2";
                gain2.gain.value = 0.25;

                var flow = new AudioNodeFlow([osc1, osc2]);

                var result = flow.connectAll([gain1, gain2]).connect(audioContext.destination);

                assert(result instanceof AudioNodeFlow);

                assert.deepEqual(audioContext.toJSON(), {
                    name: "AudioDestinationNode",
                    inputs: [
                        {
                            name: "GainNode#gain1",
                            gain: {
                                value: 0.5,
                                inputs: []
                            },
                            inputs: [
                                {
                                    name: "OscillatorNode#osc1",
                                    type: "sine",
                                    frequency: {
                                        value: 660,
                                        inputs: []
                                    },
                                    detune: {
                                        value: 0,
                                        inputs: []
                                    },
                                    inputs: []
                                },
                                {
                                    name: "OscillatorNode#osc2",
                                    type: "sine",
                                    frequency: {
                                        value: 880,
                                        inputs: []
                                    },
                                    detune: {
                                        value: 0,
                                        inputs: []
                                    },
                                    inputs: []
                                }
                            ]
                        },
                        {
                            name: "GainNode#gain2",
                            gain: {
                                value: 0.25,
                                inputs: []
                            },
                            inputs: [
                                {
                                    name: "OscillatorNode#osc1",
                                    type: "sine",
                                    frequency: {
                                        value: 660,
                                        inputs: []
                                    },
                                    detune: {
                                        value: 0,
                                        inputs: []
                                    },
                                    inputs: []
                                },
                                {
                                    name: "OscillatorNode#osc2",
                                    type: "sine",
                                    frequency: {
                                        value: 880,
                                        inputs: []
                                    },
                                    detune: {
                                        value: 0,
                                        inputs: []
                                    },
                                    inputs: []
                                }
                            ]
                        }
                    ]
                });
            });
        });
    });
    describe("sequence", function () {
        context("(nodeList: AudioNode[]): AudioNodeFlow", function () {
            it("should connect sequence to nodeList", function () {
                var osc1 = audioContext.createOscillator();
                var osc2 = audioContext.createOscillator();
                var gain1 = audioContext.createGain();
                var gain2 = audioContext.createGain();

                osc1.$id = "osc1";
                osc1.frequency.value = 660;
                osc2.$id = "osc2";
                osc2.frequency.value = 880;
                gain1.$id = "gain1";
                gain1.gain.value = 0.5;
                gain2.$id = "gain2";
                gain2.gain.value = 0.25;

                var flow = new AudioNodeFlow([osc1, osc2]);

                var result = flow.sequence([gain1, gain2]).connect(audioContext.destination);

                assert(result instanceof AudioNodeFlow);

                assert.deepEqual(audioContext.toJSON(), {
                    name: "AudioDestinationNode",
                    inputs: [
                        {
                            name: "GainNode#gain2",
                            gain: {
                                value: 0.25,
                                inputs: []
                            },
                            inputs: [
                                {
                                    name: "GainNode#gain1",
                                    gain: {
                                        value: 0.5,
                                        inputs: []
                                    },
                                    inputs: [
                                        {
                                            name: "OscillatorNode#osc1",
                                            type: "sine",
                                            frequency: {
                                                value: 660,
                                                inputs: []
                                            },
                                            detune: {
                                                value: 0,
                                                inputs: []
                                            },
                                            inputs: []
                                        },
                                        {
                                            name: "OscillatorNode#osc2",
                                            type: "sine",
                                            frequency: {
                                                value: 880,
                                                inputs: []
                                            },
                                            detune: {
                                                value: 0,
                                                inputs: []
                                            },
                                            inputs: []
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                });
            });
        });
    })
});
