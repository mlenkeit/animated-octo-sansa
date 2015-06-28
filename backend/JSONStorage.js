'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');

module.exports = function(config) {
  var router = new express.Router();
  router.use(bodyParser.urlencoded({ extended: true }));

  router.get('/bookmarks', function(req, res) {
    fs.readFile(config.filepath, function(err, data) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(JSON.parse(data.toString()));
    });
  });

  router.post('/bookmarks', function(req, res) {
    if (req.body.url && req.body.tags) {
      res.sendStatus(201);
    } else {
      res.sendStatus(400);
    }
  });

  return router;
};
