import Container from './container'

const images = [
  new Container(1, '/images/sample.jpg'),
  new Container(2, '/images/sample.jpg'),
  new Container(3, '/images/sample.jpg'),
  new Container(4, '/images/sample.jpg'),
  new Container(5, '/images/sample.jpg')
]

export default function(app) {
  app.set('images', images)

  app.on('route:image', p => {
    app.set('image', images.find(i => i.id == p.image))
  })
  app.on('key:confirm', b => {
    let {image} = window.image = app.sources

    if (image) image.confirmSeed(b).sampleSeed()
  })
}