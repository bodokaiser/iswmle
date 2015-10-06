import geod from 'bodokaiser/geod'

import Seed from './seed';

class State {

  constructor(image) {
    this.image = image;
    this.seeds = [];
  }

  sampleSeed() {
    let {height, width} = this.image;

    let [x, y] = [
      random(0, width),
      random(0, height)
    ];

    this.seeds.push(new Seed(x, y));

    return this.currentSeed();
  }

  currentSeed() {
    return this.seeds
      .slice(-1)
      .pop();
  }

  confirmSeed(bool) {
    return this
      .currentSeed()
      .confirm(bool);
  }

}

export default State;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}