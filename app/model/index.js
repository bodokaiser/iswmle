import State from './state';

const images = [
  { id: 1, src: '/images/sample.jpg' },
  { id: 2, src: '/images/sample.jpg' },
  { id: 3, src: '/images/sample.jpg' },
  { id: 4, src: '/images/sample.jpg' },
  { id: 5, src: '/images/sample.jpg' }
].map(imageify);

export default function(app) {
  app.on('source', (name, params) => {
    if (name !== 'params') return;

    var image = images.find(image => {
      return image.id == params.id;
    });

    if (image.complete) {
      initImage();
    } else {
      image.onload = initImage;
    }

    function initImage() {
      let state = new State(image);

      let seed = state
        .sampleSeed();

      app.set('image', image);
      app.set('seeds', [seed]);

      app.on('key:confirm', bool => {
        app.set('seeds', [
          state.confirmSeed(bool),
          state.sampleSeed()
        ]);
      });
    }
  });
  
  app.set('images', images);
}

function imageify(image) {
  let el = new Image();

  el.id = image.id;
  el.src = image.src;

  return el;
}