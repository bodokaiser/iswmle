import {tree, render} from 'dekujs/deku'
import element        from 'dekujs/virtual-element'

import Sidebar from './sidebar'

var app = tree(<Sidebar heading="foo" description="bar" />)

render(app, document.querySelector('.list-group'))