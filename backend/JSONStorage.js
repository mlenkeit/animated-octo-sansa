'use strict';

var express = require('express');

module.exports = function() {
  var router = new express.Router();

  router.get('/bookmarks', function(req, res) {
    res.json([]);
  });

  return router;
};
