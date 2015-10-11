import router from 'ianstormtaylor/router'

export default function(app) {
  app.router = new router()
    .on('/', c => app.emit('route:index'))
    .on('/:image', c => app.emit('route:image', c.params))
    .listen()
}