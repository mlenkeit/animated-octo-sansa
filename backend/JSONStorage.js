'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');

module.exports = function(config) {
  if (!config.filepath) {
    throw new Error('Mandatory config parameter \'filepath\' missing.');
  }
  if (!config.logger) {
    throw new Error('Mandatory config parameter \'logger\' missing');
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
    }).catch(next);
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
          err.status = 500;
          return reject(err);
        }
        resolve(JSON.parse(data.toString()));
      });
    });
  }

  function writeJSON(json) {
    return new Promise(function(resolve, reject) {
      fs.writeFile(config.filepath, JSON.stringify(json), function(err) {
        if (err) {
          err.status = 500;
          return reject(err);
        }
        resolve();
      });
    });
  }

  function validateBookmark(bookmark) {
    return new Promise(function(resolve, reject) {
      if (!bookmark.url || !bookmark.tags) {
        var err = new Error('Invalid bookmark: ' + JSON.stringify(bookmark));
        err.status = 400;
        return reject(err);
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

  app.get('/', function(req, res, next) {
    return readJSON().then(function(json) {
      res.json(json);
    }).catch(next);
  });

  app.post('/', function(req, res, next) {
    validateBookmark(req.body).then(function(bookmark) {
      return readJSON().then(function(json) {
        json.push(bookmark);
        return writeJSON(json).then(function() {
          res.sendStatus(201);
        });
      });
    }).catch(next);
  });

  /*eslint-disable no-unused-vars*/
  app.use(function(err, req, res, next) {
    var status = err.status || 500;
    config.logger.error(err.toString(), err);
    return res.status(status).send(err.toString());
  });
  /*eslint-enable no-unused-vars*/

  return app;
};
