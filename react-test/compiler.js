// based on:
// - https://github.com/Khan/react-components/blob/7afcf35c921a2f984ddff71dead25217f8de3532/test/compiler.js
// - http://www.hammerlab.org/2015/02/14/testing-react-web-apps-with-mocha/

var fs = require('fs'),
    ReactTools = require('react-tools'),
    origJs = require.extensions['.js'];

require.extensions['.js'] = function(module, filename) {
  if (filename.indexOf('node_modules/') >= 0) {
    return (origJs || require.extensions['.js'])(module, filename);
  }
  var content = fs.readFileSync(filename, 'utf8');
  var compiled = ReactTools.transform(content, {harmony: true});
  return module._compile(compiled, filename);
};
