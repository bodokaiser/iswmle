import element from 'dekujs/virtual-element';

import Canvas from './canvas';

export default function(app) {
  app.on('key:yes', () => {
    console.log('yes');
  });
  app.on('key:no', () => {
    console.log('no');
  });

  app.on('route:canvas', context => {
    let image = app.sources.images.find(image => {
      return image.id == context.params.id;
    });

    app.mount(<Canvas image={image} />);
  });
}