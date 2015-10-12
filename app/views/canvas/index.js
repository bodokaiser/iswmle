import element from 'dekujs/virtual-element'

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

      image.init(state.ctx.getImageData(0, 0, img.width, img.height))
    })
  }

}

export default Canvas
