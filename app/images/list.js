import element from 'dekujs/virtual-element';

import Item from './item';

let List = {

  propTypes: {
    images: {
      type: 'array'
    }
  },

  render(component) {
    var images = component.props.images.map(image => {
      return <Item image={image} />
    });

    return <div class="row">{images}</div>;
  }

};

export default List;