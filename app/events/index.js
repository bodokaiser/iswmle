const Y = 0x79;
const N = 0x6e;

export default function(app) {
  window.addEventListener('keypress', event => {
    switch (event.keyCode) {
      case Y: app.emit('key:yes'); break;
      case N: app.emit('key:no'); break;
    }

    event.preventDefault();
  });
}