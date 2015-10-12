import geod   from 'bodokaiser/geod'
import avdown from 'bodokaiser/avdown'

import Emitter from 'component/emitter'

const MAX = 0xffffff

const KERNEL_SIZE = 7

const COLOR_NEUTRAL  = '#5A71E0';
const COLOR_POSITIVE = '#5AE083';
const COLOR_NEGATIVE = '#E05A5A';

class Container extends Emitter {

  constructor(id, src) {
    super()

    this.id = id
    this.src = src
  }

  load(callback) {
    let el = new Image()

    el.addEventListener('load', e => {
      this.width = el.width
      this.height = el.height

      callback(el)
    })
    el.src = this.src
  }

  init(data) {
    let [w, h] = [data.width, data.height]
    let c = [0, 0, 0].map(() => new Uint8ClampedArray(w*h))

    for (let i = 0; i < w*h; i++) {
      c[0][i] = data.data[i]
      c[1][i] = data.data[i+1]
      c[2][i] = data.data[i+2]
    }

    this.colors = c.map(c => {
      let r = avdown(w, h)
        .image(c)
        .kernel(KERNEL_SIZE)
        .transform()

      this.rwidth = r[1]
      this.rheight = r[2]

      let d = [0, 0].map(() => new Uint32Array(r[1]*r[2]))

      d.forEach(a => a.fill(MAX))

      return { weight: r[0], distance: d }
    })

    this.sampleSeed()
  }

  sampleSeed() {
    this.current = [
      random(0, this.rwidth),
      random(0, this.rheight)
    ]

    this.emit('seed', {
      x: this.current[0] * KERNEL_SIZE,
      y: this.current[1] * KERNEL_SIZE,
      color: COLOR_NEUTRAL
    })

    return this
  }

  confirmSeed(bool) {
    let [x, y] = this.current

    this.emit('seed', {
      x: x * KERNEL_SIZE,
      y: y * KERNEL_SIZE,
      color: (bool) ? COLOR_POSITIVE : COLOR_NEGATIVE
    })

    this.colors.forEach(c => {
      c.distance[(bool) ? 0 : 1][x + y * this.rwidth] = 0
    })

    return this
  }

  transform() {
    let b = new Uint8ClampedArray(this.width * this.height).fill(0)

    this.colors.forEach(c => {
      let w = c.weight

      c.distance.forEach(d => {
        geod(this.rwidth, this.rheight)
          .iters(4)
          .weight(w)
          .distance(d)
          .transform()
      })
    })

    for (let i = 0; i < this.rwidth * this.rheight; i++) {
      let d = this.colors
        .map(c => c.distance)
        .map(d => d[1][i] - d[0][i])
        .reduce((p, v) => p + v)

      if (d > 0) {
        let x = KERNEL_SIZE * (i % this.rwidth)
        let y = KERNEL_SIZE * Math.floor(i / this.rwidth)

        b.set([1, 1, 1, 1, 1, 1, 1], x + y * this.width)
        b.set([1, 1, 1, 1, 1, 1, 1], x + (y+1) * this.width)
        b.set([1, 1, 1, 1, 1, 1, 1], x + (y+2) * this.width)
      }
    }

    this.emit('segment', b)
  }

}

export default Container

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}