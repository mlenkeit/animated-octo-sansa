'use strict';

var express = require('express');
var fs = require('fs');

module.exports = function(config) {
  var router = new express.Router();

  router.get('/bookmarks', function(req, res) {
    fs.readFile(config.filepath, function(err, data) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(JSON.parse(data.toString()));
    });
  });

  return router;
};
