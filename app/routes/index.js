import Router from 'ianstormtaylor/router';

export default function(app) {
  app.router = new Router()
    .on('/', context => app.emit('route:index', context))
    .on('/:id', context => app.emit('route:canvas', context))
    .listen();
}