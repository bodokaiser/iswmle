import geod from 'bodokaiser/geod'

import State from './state';

const images = [
  { id: 1, src: '/images/sample.jpg' },
  { id: 2, src: '/images/sample.jpg' },
  { id: 3, src: '/images/sample.jpg' },
  { id: 4, src: '/images/sample.jpg' },
  { id: 5, src: '/images/sample.jpg' }
].map(imageify);

const seeds = [
  {"x":335,"y":294,"correct":false},
  {"x":31,"y":216,"correct":false},
  {"x":289,"y":457,"correct":false},
  {"x":785,"y":351,"correct":true},
  {"x":108,"y":883,"correct":false},
  {"x":1735,"y":937,"correct":false},
  {"x":993,"y":993,"correct":true},
  {"x":1873,"y":1068,"correct":false},
  {"x":1738,"y":432,"correct":false},
  {"x":937,"y":1076,"correct":false},
  {"x":1730,"y":725,"correct":false},
  {"x":1721,"y":777,"correct":false},
  {"x":1365,"y":811,"correct":true},
  {"x":1579,"y":222,"correct":false},
  {"x":1038,"y":448,"correct":false},
  {"x":1018,"y":128,"correct":false},
  {"x":960,"y":361,"correct":false},
  {"x":676,"y":396,"correct":true},
  {"x":927,"y":48,"correct":false},
  {"x":386,"y":610,"correct":false},
  {"x":1436,"y":1042,"correct":false},
  {"x":20,"y":754,"correct":false},
  {"x":1265,"y":864,"correct":true},
  {"x":1317,"y":1063,"correct":false},
  {"x":1716,"y":741,"correct":false},
  {"x":405,"y":503,"correct":false},
  {"x":1441,"y":438,"correct":false},
  {"x":315,"y":228,"correct":false},
  {"x":1727,"y":962,"correct":false},
  {"x":994,"y":273,"correct":false},
  {"x":171,"y":698,"correct":false},
  {"x":1271,"y":142,"correct":false},
  {"x":210,"y":49,"correct":false},
  {"x":1640,"y":490,"correct":false},
  {"x":1175,"y":1000,"correct":true},
  {"x":922,"y":681,"correct":true},
  {"x":1002,"y":476,"correct":false},
  {"x":997,"y":989,"correct":true},
  {"x":965,"y":915,"correct":true},
  {"x":1057,"y":342,"correct":false},
  {"x":159,"y":261,"correct":false},
  {"x":1894,"y":825,"correct":false},
  {"x":671,"y":206,"correct":true},
  {"x":1581,"y":793,"correct":false}
];

export default function(app) {
  setTimeout(function() {
    console.log('starting')

    let dists = window.dists = [
      new Uint32Array(1920*1080),
      new Uint32Array(1920*1080)
    ].map(d => d.fill(1920*1080))

    seeds.forEach(seed => {
      dists[(seed.correct) ? 0 : 1][seed.x + seed.y * 1920] = 0
    })

    console.log('transform1')
    geod(1920, 1080)
      .distance(dists[0])
      .transform()

    console.log('transform2')
    geod(1920, 1080)
      .distance(dists[1])
      .transform()


    window.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'

    console.log('filling')
    for (var i = 0; i < 1920; i++) {
      for (var j = 0; j < 1080; j++) {
        let n = i * 1920 + j

        if (dists[0][n] > dists[1][n]) {
          window.ctx.fillRect(i, j, 1, 1)
        }
      }
    }
    console.log('finish')
  }, 5000)

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
      let state = window.state = new State(image);

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