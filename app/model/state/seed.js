const COLOR_NEUTRAL  = '#5A71E0'
const COLOR_POSITIVE = '#5AE083'
const COLOR_NEGATIVE = '#E05A5A'

class Seed {

  constructor(x, y) {
    this.x = x
    this.y = y

    this.color = COLOR_NEUTRAL
  }

  confirm(bool) {
    this.color = (bool) ? COLOR_POSITIVE : COLOR_NEGATIVE

    return this
  }

}

export default Seed