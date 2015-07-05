'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');

module.exports = function(config) {
  if (!config.filepath) {
    throw new Error('Mandatory config parameter \'filepath\' missing.');
  }

  var initialized = false;

  var app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(function(req, res, next) {
    if (!initialized) {
      initialized = initializeJSON();
    }
    return initialized.then(function() {
      next();
    }).catch(function(err) {
      res.status(err.status).send(err.msg);
    });
  });

  function existsJSON() {
    return new Promise(function(resolve) {
      fs.exists(config.filepath, function(exists) {
        resolve(exists);
      });
    });
  }

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

  function initializeJSON() {
    return existsJSON().then(function(exists) {
      if (!exists) {
        return writeJSON([]);
      }
    });
  }

  app.get('/', function(req, res) {
    readJSON().then(function(json) {
      res.json(json);
    }).catch(function(err) {
      res.status(err.status).send(err.msg);
    });
  });

  app.post('/', function(req, res) {
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

  return app;
};
