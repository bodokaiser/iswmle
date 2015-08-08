import element from 'dekujs/virtual-element';

let ImageItem = {

  propTypes: {
    image: {
      type: 'object'
    }
  },

  render(component) {
    let {props} = component;

    return <div class="col-xs-4">
      <a class="thumbnail" href={'/' + props.image.id}>
        <img class="img-rounded" src={props.image.src} />
      </a>
    </div>;
  }

};

export default ImageItem;