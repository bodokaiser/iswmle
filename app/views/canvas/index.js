import element from 'dekujs/virtual-element';

let Canvas = {

  initialState() {
    return {
      pasted: false
    };
  },

  propTypes: {
    image: { source: 'image' },
    seeds: { source: 'seeds' }
  },

  render() {
    return <canvas></canvas>;
  },

  afterRender({props, state}, element) {
    let {pasted} = state;
    var {image, seeds} = props;

    if (image && !pasted) initCanvas(image, element);
    if (seeds) seeds.forEach(seed => drawSeed(seed, element));
  },

  afterUpdate(component, props, state, send) {
    let {pasted} = component.state;
    let {image} = component.props;

    if (image && !pasted) send({ pasted: true });
  }

};

export default Canvas;

function drawSeed(seed, element) {
  let context = element.getContext('2d');

  context.fillStyle = seed.color;
  context.fillRect(seed.x, seed.y, 8, 8);
}

function initCanvas(image, element) {
  element.width = image.width;
  element.height = image.height;
  
  element
    .getContext('2d')
    .drawImage(image, 0, 0);
}