import State from './state';
import Image from './image';

const images = [
  { id: 1, src: '/images/sample.jpg' },
  { id: 2, src: '/images/sample.jpg' },
  { id: 3, src: '/images/sample.jpg' },
  { id: 4, src: '/images/sample.jpg' },
  { id: 5, src: '/images/sample.jpg' }
].map(image => new Image(image.id, image.src));

export default function(app) {
  app.on('source', (name, params) => {
    if (name !== 'params') return;

    var image = images.find(image => {
      return image.id == params.id;
    });

    image.fromUrl(() => {
      let seed = new State(image)
        .sampleSeed()
        .currentSeed();

      app.set('image', image);
      app.set('seed', seed);
    });
  });

  app.set('images', images);
}