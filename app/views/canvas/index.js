import element from 'dekujs/virtual-element'

const RECT_W = 8
const RECT_H = 8

let Canvas = {

  propTypes: {
    image: { source: 'image' }
  },

  render() {
    return <canvas></canvas>
  },

  afterRender({props, state}, canvas) {
    let {image} = props

    image.load(img => {
      canvas.width = img.width
      canvas.height = img.height

      state.ctx = canvas.getContext('2d')
      state.ctx.drawImage(img, 0, 0)

      image.addEventListener('seed', paintSeed)
      image.init(state.ctx.getImageData(0, 0, img.width, img.height))
    })

    function paintSeed(seed) {
      state.ctx.fillStyle = seed.color
      state.ctx.fillRect(seed.x, seed.y, RECT_W, RECT_H)
    }
  }

}

export default Canvas