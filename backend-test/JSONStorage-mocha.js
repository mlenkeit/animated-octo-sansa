/*global afterEach, beforeEach, describe, it,*/
/*eslint no-unused-expressions: 0*/
'use strict';

var express = require('express');
var fs = require('mock-fs');
var request = require('supertest');
var JSONStorage = require('./../backend/JSONStorage');

describe('JSONStorage', function() {

  var app,
      filename = 'bookmarks.json', filepath = __dirname + '/' + filename;

  var mockStorageData = function(data) {
    var filesystem = {};
    filesystem[__dirname] = {};
    filesystem[__dirname][filename] = JSON.stringify(data);
    fs(filesystem);
  };

  beforeEach(function() {
    app = express();
    app.use('/', new JSONStorage({
      filepath: filepath
    }));
    mockStorageData([]);
  });

  afterEach(function() {
    fs.restore();
  });

  describe('GET /bookmarks', function() {

    var path = '/bookmarks';

    it('responds with 200', function(done) {
      request(app).get(path).expect(200, done);
    });

    it('responds in json format', function(done) {
      request(app).get(path).expect('Content-Type', /json/, done);
    });

    it('responds with an empty array by default', function(done) {
      request(app)
        .get('/bookmarks')
        .expect('[]', done);
    });

    it('responds with the content of the JSON file', function(done) {
      var json = [{key: 1}, {key: 2}];
      mockStorageData(json);
      request(app).get(path).expect(JSON.stringify(json), done);
    });

    describe('when the file is not found', function() {

      beforeEach(function() {
        fs({});
      });

      it('responds with 500', function(done) {
        request(app).get(path).expect(500, done);
      });
    });
  });
});
