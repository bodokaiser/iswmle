const Y = 0x79
const N = 0x6e

const ENTER = 0x0d

export default function(app) {
  window.addEventListener('keypress', e => {
    switch (e.keyCode) {
      case Y: app.emit('key:confirm', true); break
      case N: app.emit('key:confirm', false); break
      case ENTER: app.emit('key:exec'); break
    }

    e.preventDefault()
  })
}