module.exports = image;

var debug = require('debug')('inliner');

function image(url) {
  url = url.replace(/#.*$/, '');
  this.emit('progress', 'get image ' + url);
  return this.get(url, { encoding: 'binary' }).then(function then(res) {
    if (url.indexOf('data:') === 0) {
      return url;
    }

    debug('image loaded: %s', url);
    var buffer = new Buffer(res.body, 'binary').toString('base64');
    return 'data:' + res.headers['content-type'] + ';base64,' + buffer;
  }).catch(function errorHandle(error) {
    debug('image %s failed to load', url, error);
    throw error;
  });
}