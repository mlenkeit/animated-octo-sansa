'use strict';

var express = require('express');
var JSONStorage = require('./JSONStorage');

module.exports = function(config) {
  var app = express();

  var router = new JSONStorage({
    filepath: config.filepath,
    logger: config.logger
  });
  app.use('/api/bookmarks', router);

  app.use('/', express.static(config.serve));

  return app;
};
