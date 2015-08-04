import element from 'dekujs/virtual-element';

import List from './list';

const images = [
  { src: '/images/sample.jpg' },
  { src: '/images/sample.jpg' },
  { src: '/images/sample.jpg' },
  { src: '/images/sample.jpg' }
];

export default function(app) {
  app.on('route:index', (context, next) => {
    app.mount(<List images={images} />);
  });
}