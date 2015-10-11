import {tree, render} from 'dekujs/deku'
import element        from 'dekujs/virtual-element'

import model  from './model'
import events from './events'
import router from './router'

import Board  from './views/board'
import Canvas from './views/canvas'

let app = tree()

app.use(model)
app.use(events)
app.use(router)

app.on('route:index', p => app.mount(<Board />))
app.on('route:image', p => app.mount(<Canvas />))

render(app, document.querySelector('main'))