import element from 'dekujs/virtual-element';

import List from './list';

const images = [
  { id: 1, src: '/images/sample.jpg' },
  { id: 2, src: '/images/sample.jpg' },
  { id: 3, src: '/images/sample.jpg' },
  { id: 4, src: '/images/sample.jpg' },
  { id: 5, src: '/images/sample.jpg' }
];

export default function(app) {
  app.set('images', images);

  app.on('route:index', (context, next) => {
    app.mount(<List images={images} />);
  });
}