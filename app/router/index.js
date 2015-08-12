import router from 'ianstormtaylor/router';

export default function(app) {
  app.router = new router()
    .on('/', context => app.emit('route:index'))
    .on('/:id', params(app), context => app.emit('route:image'))
    .listen();
}

function params(app) {
  return (context, next) => {
    app.set('params', context.params);

    next();
  }
}