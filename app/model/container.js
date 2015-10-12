import avdown from 'bodokaiser/avdown'

import Emitter from 'component/emitter'

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
        .kernel(7)
        .transform()

      return { data: r[0], width: r[1], height: r[2] }
    })
  }

}

export default Container