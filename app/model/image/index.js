import Decoder from './decoder';

class Image {

  constructor(id, url) {
    this.id = id;
    this.src = url;
  }

  fromUrl(callback) {
    this.jpeg = new Decoder();
    this.jpeg.onload = callback;
    this.jpeg.load(this.src);
  }

  get width() {
    return this.jpeg.width;
  }

  get height() {
    return this.jpeg.height;
  }

  pasteToCanvas(element) {
    let {width, height} = this;

    let image = element
      .getContext('2d')
      .getImageData(0, 0, width, height);

    element.width = width;
    element.height = height;

    this.jpeg.copyToImageData(image);

    element
      .getContext('2d')
      .putImageData(image, 0, 0);
  }

}

export default Image;