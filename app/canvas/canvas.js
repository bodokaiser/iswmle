import element from 'dekujs/virtual-element';

import {JpegImage} from './decoder';

let Canvas = {

  render(component) {
    let {props, state} = component;

    return <canvas>
      <img src={props.image.src} />
    </canvas>;
  },

  afterMount(component, element, send) {
    var ctx = element.getContext('2d');

    fetch(component.props.image.src, function() {
      let {width, height} = this;

      // does not work with deku state
      element.width = width;
      element.height = height;

      let img = ctx.getImageData(0, 0, width, height);

      this.copyToImageData(img);

      ctx.putImageData(img, 0, 0);
    });
  }

};

export default Canvas;

function fetch(url, callback) {
  let jpeg = new JpegImage();

  jpeg.onload = callback;
  jpeg.load(url);
}