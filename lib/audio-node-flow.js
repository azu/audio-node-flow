(function() {
// LICENSE : MIT
"use strict";

/**
 * @param {AudioNode|AudioNode[]} source the source is AudioNode.
 * @constructor
 */
function AudioNodeFlow(source) {
    if (Array.isArray(source)) {
        this.sourceList = source;
    } else {
        this.sourceList = [source];
    }
}
/**
 * connect the source to {@link node}.
 * @param {AudioNode} node the node is AudioNode
 * @returns {AudioNodeFlow}
 */
AudioNodeFlow.prototype.connect = function (node) {
    this.sourceList.forEach(function (source) {
        source.connect(node);
    });
    return new AudioNodeFlow(node);
};

/**
 * connect the source to {@link nodeList}.
 * @param {AudioNode[]} nodeList the nodeList is array of AudioNode.
 * @returns {AudioNodeFlow}
 */
AudioNodeFlow.prototype.connects = function (nodeList) {
    nodeList.forEach(function (node) {
        this.sourceList.forEach(function (source) {
            source.connect(node);
        });
    }, this);
    return new AudioNodeFlow(nodeList);
};

this.AudioNodeFlow = AudioNodeFlow;
}).call(this.self || global);
