import {tree, render} from 'dekujs/deku';

import events from './events';
import routes from './routes';
import images from './images';
import canvas from './canvas';

let app = tree();

app.use(events);
app.use(images);
app.use(canvas);
app.use(routes);

render(app, document.querySelector('main'));