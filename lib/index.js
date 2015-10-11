var os    = require('os');
var fs    = require('fs');
var path  = require('path');
var roo   = require('roo');
var send  = require('koa-send');
var duo   = require('duo');
var less  = require('duo-less');
var babel = require('duo-babel');

const root = path.resolve(__dirname, '..');

roo(root)
  .use(rewrite)
  .bundle(build)
  .bundle('app/index.js')
  .bundle('app/index.less')
  .static('srv')
  .listen(3000);

function build(file, done) {
  duo(file.root)
    .entry(file.path)
    .use(less())
    .use(babel({
      jsxPragma: 'element'
    }))
    .run(function(err, src) {
      if (err) console.error(err);
      if (err) return done(err);

      if (file.type === 'less') {
        file.type = 'css';
      }
      file.src = src.code;

      done(null, file);
    });
}

function* rewrite(next) {
  switch (this.path) {
    case '/javascripts/build.js':
      this.path = '/app/index.js';
      break;
    case '/stylesheets/build.css':
      this.path = '/app/index.less';
      break;
  }

  yield next;

  if (!this.body) {
    yield send(this, 'srv/index.html', { root: root });
  }
}