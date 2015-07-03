'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');

module.exports = function(config) {
  if (!config.filepath) {
    throw new Error('Mandatory config parameter \'filepath\' missing.');
  }

  var router = new express.Router();
  router.use(bodyParser.urlencoded({ extended: true }));

  function readJSON() {
    return new Promise(function(resolve, reject) {
      fs.readFile(config.filepath, function(err, data) {
        if (err) {
          return reject({ msg: err, status: 500});
        }
        resolve(JSON.parse(data.toString()));
      });
    });
  }

  function writeJSON(json) {
    return new Promise(function(resolve, reject) {
      fs.writeFile(config.filepath, JSON.stringify(json), function(err) {
        if (err) {
          return reject({ status: 500 });
        }
        resolve();
      });
    });
  }

  function validateBookmark(bookmark) {
    return new Promise(function(resolve, reject) {
      if (!bookmark.url || !bookmark.tags) {
        return reject({ status: 400 });
      }
      resolve(bookmark);
    });
  }

  router.get('/', function(req, res) {
    readJSON().then(function(json) {
      res.json(json);
    }).catch(function(err) {
      res.status(err.status).send(err.msg);
    });
  });

  router.post('/', function(req, res) {
    validateBookmark(req.body).then(function(bookmark) {
      return readJSON().then(function(json) {
        json.push(bookmark);
        return writeJSON(json).then(function() {
          res.sendStatus(201);
        });
      });
    }).catch(function(err) {
      res.status(err.status).send(err.msg);
    });
  });

  return router;
};
