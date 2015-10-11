const Y = 0x79
const N = 0x6e

export default function(app) {
  window.addEventListener('keypress', e => {
    switch (e.keyCode) {
      case Y: app.emit('key:confirm', true); break
      case N: app.emit('key:confirm', false); break
    }

    e.preventDefault()
  })
}