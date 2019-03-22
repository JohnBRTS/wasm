import React, { Component } from 'react';
import Porcupine from './porcupine';
import PicovoiceAudioManager from './picovoiceAudioManager';
import compileWasm from '../useWasm/compileWasm';
const keywordIDs = {
  icommand: new Uint8Array([
    0xcf,
    0xce,
    0x91,
    0x9c,
    0xcd,
    0xc4,
    0x4c,
    0xcb,
    0x01,
    0xb4,
    0xba,
    0x71,
    0xcf,
    0xff,
    0xaa,
    0x66,
    0xb1,
    0xf2,
    0xb3,
    0xc8,
    0xd3,
    0x06,
    0x3b,
    0x6e,
    0x06,
    0x30,
    0x60,
    0x0b,
    0xcb,
    0xcb,
    0x4d,
    0x03,
    0xb1,
    0xae,
    0x8b,
    0x6f,
    0xca,
    0xd0,
    0x48,
    0x0a,
    0x7f,
    0xb3,
    0xe6,
    0x17,
    0x43,
    0x15,
    0xdb,
    0xcf,
    0x5c,
    0x9e,
    0xf9,
    0x31,
    0x3a,
    0x26,
    0xf6,
    0x83,
    0x9a,
    0x48,
    0x6e,
    0x54,
    0x3b,
    0xaf,
    0x0c,
    0xe7,
    0x29,
    0x7b,
    0x0b,
    0x6a,
    0xaa,
    0xf6,
    0xa9,
    0xef,
    0x6f,
    0x96,
    0x03,
    0x3f,
    0x28,
    0xb5,
    0x0f,
    0xf9,
    0x67,
    0x2f,
    0x22,
    0xfb,
    0xd1,
    0x42,
    0x9c,
    0x6c,
    0xcb,
    0x88,
    0xbc,
    0x36,
    0x16,
    0x58,
    0xe2,
    0xb9
  ])
};
let keywordNames = Object.keys(keywordIDs);
let sensitivities = new Float32Array([0.5]);

let currentTimeSeconds = function() {
  return new Date().getTime() / 1000;
};

let is_listening = false;
let listeningStartSeconds;
let processCallback = function(keywordIndex) {
  if (keywordIndex === -1) {
    if (is_listening && currentTimeSeconds() - listeningStartSeconds > 5) {
      console.log(
        '(keywordIndex === -1) > && (is_listening && (currentTimeSeconds() - listeningStartSeconds) > 5)'
      );
      console.log('turning off listening');
      is_listening = false;
    }
    return;
  }

  let keyword = keywordNames[keywordIndex];
  if (is_listening) {
    console.log('is listening for further commands');
    console.log('turning off listening');
    is_listening = false;
  }
  if (keyword === 'icommand') {
    console.log('(keyword === "icommand")');
  }
};
let audioManager;

let audioManagerErrorCallback = function(ex) {
  console.log(ex.toString());
};

let start = function() {
  audioManager = new PicovoiceAudioManager();
  audioManager.start(
    Porcupine().create(Object.values(keywordIDs), sensitivities),
    processCallback,
    audioManagerErrorCallback
  );
};

let stop = function() {
  audioManager.stop();
};

class Wrapper extends Component {
  state = {
    on: false
  };
  componentDidMount() {
    compileWasm({url: './pv_porcupine.wasm'})
  }
  start = () => {
    this.setState({ on: true });
    start();
  };
  stop = () => {
    this.setState({ on: false });
    stop();
  };
  render() {
    return (
      <div>
        <button disabled={this.state.on} onClick={this.start}>
          Start
        </button>
        <button disabled={!this.state.on} onClick={this.stop}>
          Stop
        </button>
      </div>
    );
  }
}

export default Wrapper;
