import element from 'dekujs/virtual-element';

const COLOR_NEUTRAL  = '#5A71E0';
const COLOR_POSITIVE = '#5AE083';
const COLOR_NEGATIVE = '#E05A5A';

let Canvas = {

  initialState() {
    return {
      pasted: false,
      seeded: false
    };
  },

  propTypes: {
    image: { source: 'image' },
    seed: { source: 'seed' }
  },

  render() {
    return <canvas></canvas>;
  },

  afterRender({props, state}, element) {
    var {image, seed} = props;
    let {pasted, seeded} = state;

    if (image && !pasted) image.pasteToCanvas(element);
    if (seed && !seeded) drawSeed(seed, element);
  },

  afterUpdate(component, props, state, send) {
    let {image, seed} = props;
    let {pasted, seeded} = state;

    if (image && !pasted) send({ pasted: true });
    if (seed && !seeded) send({ seeded: true });
  }

};

export default Canvas;

function drawSeed(seed, element) {
  let context = element.getContext('2d');

  context.fillStyle = COLOR_NEUTRAL;
  context.fillRect(seed.x, seed.y, 8, 8);
}