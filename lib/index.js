var os    = require('os');
var fs    = require('fs');
var roo   = require('roo');
var duo   = require('duo');
var less  = require('duo-less');
var babel = require('duo-babel');

var app = roo(__dirname + '/../')
  .use(rewrite)
  .bundle(build)
  .bundle('app/index.js')
  .bundle('app/index.less')
  .static('srv');

app.listen(3000);

function build(file, done) {
  duo(file.root)
    .entry(file.path)
    .use(less())
    .use(babel())
    .run(function(err, src) {
      if (err) console.error(err);
      if (err) return done(err);

      if (file.type === 'less') file.type = 'css';

      file.src = src.code;

      done(null, file);
    });
}

function* rewrite(next) {
  if (this.path === '/javascripts/build.js') this.path = '/app/index.js';
  if (this.path === '/stylesheets/build.css') this.path = '/app/index.less';

  yield next;
}
