'use strict';

var express = require('express');
var JSONStorage = require('./JSONStorage');

module.exports = function(config) {
  var app = express();

  var router = new JSONStorage({
    filepath: config.filepath
  });
  app.use('/api/bookmarks', router);

  return app;
};
