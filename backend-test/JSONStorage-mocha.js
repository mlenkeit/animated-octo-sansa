/*global beforeEach, describe, it,*/
/*eslint no-unused-expressions: 0*/
'use strict';

var express = require('express');
var request = require('supertest');
var JSONStorage = require('./../backend/JSONStorage');

describe('JSONStorage', function() {

  var app;

  beforeEach(function() {
    app = express();
    app.use('/', new JSONStorage());
  });

  describe('GET /bookmarks', function() {

    var path = '/bookmarks';

    it('responds with 200', function(done) {
      request(app).get(path).expect(200, done);
    });
  });
});
