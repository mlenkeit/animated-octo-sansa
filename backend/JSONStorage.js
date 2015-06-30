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
      fs.readFile(config.filepath, function(err, data) {
        if (err) {
          return res.sendStatus(500);
        }
        var json = JSON.parse(data.toString());
        json.push({
          url: req.body.url,
          tags: req.body.tags
        });
        fs.writeFile(config.filepath, JSON.stringify(json), function(err2) {
          if (err2) {
            return res.sendStatus(500);
          }
          res.sendStatus(201);
        });
      });
    } else {
      res.sendStatus(400);
    }
  });

  return router;
};
