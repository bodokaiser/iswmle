import {tree, render} from 'dekujs/deku';
import element        from 'dekujs/virtual-element';

import routes from './routes';
import images from './images';
import layout from './layout';

let app = tree();

app.use(routes);
//app.use(layout);
app.use(images);

render(app, document.querySelector('main'));