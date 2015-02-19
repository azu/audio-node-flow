(function () {
    // LICENSE : MIT
    "use strict";

    /**
     * @param {AudioNode|AudioNode[]} source the source is AudioNode.
     * @constructor
     */
    function AudioNodeFlow(source) {
        AudioNodeFlow.displayName = "AudioNodeFlow";
        if (Array.isArray(source)) {
            this.sourceList = source;
        } else {
            this.sourceList = [source];
        }
    }

    /**
     * connect the source to node.
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
     * connect the source to nodeList.
     * @param {AudioNode[]} nodeList the nodeList is array of AudioNode.
     * @returns {AudioNodeFlow}
     */
    AudioNodeFlow.prototype.connectAll = function (nodeList) {
        nodeList.forEach(function (node) {
            this.sourceList.forEach(function (source) {
                source.connect(node);
            });
        }, this);
        return new AudioNodeFlow(nodeList);
    };

    /**
     * connect sequence to nodeList.
     * @param {AudioNode[]} nodeList the nodeList is array of AudioNode.
     * @returns {AudioNodeFlow}
     */
    AudioNodeFlow.prototype.sequence = function (nodeList) {
        var lastNodeList = this.sourceList.map(function (source) {
            var lastNodeFlow = nodeList.reduce(function (flow, node) {
                return flow.connect(node);
            }, (new AudioNodeFlow(source)));
            // pick up a node from the source
            // this source is a last node of the sequence
            return lastNodeFlow.sourceList[0];
        });
        return new AudioNodeFlow(lastNodeList);
    };
    this.AudioNodeFlow = AudioNodeFlow;
}).call(this.self || global);
