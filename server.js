'use strict';

var App = require('./backend/App');
var Logger = require('./backend/Logger');

var logger = new Logger();
var app = new App({
  filepath: 'bookmarks.json',
  logger: logger,
  serve: __dirname + '/dist'
});
var port = process.env.PORT || 8080;
app.listen(port, function() {
  logger.info('Listening to port ' + port);
});
