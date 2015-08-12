import element from 'dekujs/virtual-element';

let Image = {

  render({props}) {
    let {image} = props;

    return <div class="col-xs-4">
      <a class="thumbnail" href={'/' + image.id}>
        <img class="img-rounded" src={image.src} />
      </a>
    </div>;
  }

};

let Images = {

  propTypes: {
    images: { source: 'images' }
  },

  render({props}) {
    let images = props.images.map(image => {
      return <Image image={image} />
    });

    return <div class="row">{images}</div>;
  }

};

export default Images;