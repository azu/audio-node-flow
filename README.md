# audio-node-flow [![Build Status](https://travis-ci.org/azu/audio-node-flow.svg?branch=master)](https://travis-ci.org/azu/audio-node-flow)

Flow control library for Web Audio API.

## Installation

```
npm install audio-node-flow
```

## Usage

Flow control

    source -> nodeA -> nodeB -> nodeC -> nodeD -> destination
                                      -> nodeE -> destination



```js
var AudioNodeFlow = require("audio-node-flow").AudioNodeFlow;
new AudioNodeFlow(source)
    .connect(nodeA)
    .sequence([nodeB, nodeC])
    .connectAll([nodeD, nodeE])
    .connect(context.destination);
```

## Tests

```
npm test
```

## Related

- :new: [AudioNode.connect(AudioNode)](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode/connect(AudioNode) "AudioNode.connect(AudioNode)")
- [Web Audio Method Chaining Sample](https://googlechrome.github.io/samples/webaudio-method-chaining/index.html "Web Audio Method Chaining Sample")

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
