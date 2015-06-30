/*global afterEach, beforeEach, describe, it,*/
/*eslint no-unused-expressions: 0*/
'use strict';

var rewire = require('rewire');
var express = require('express');
var request = require('supertest');
var JSONStorage = rewire('./../backend/JSONStorage');

describe('JSONStorage', function() {

  var app,
      filename = 'bookmarks.json', filepath = __dirname + '/' + filename,
      fsMock;

  var mockFilesystem = function() {
    var fs = {
      fileContentsByPath: {},
      readFile: function(path, cb) {
        var content = this.fileContentsByPath[path];
        return process.nextTick(function() {
          return cb(!content, new Buffer(content || ''));
        });
      },
      __setStorageData: function(data) {
        this.fileContentsByPath[filepath] = data ? JSON.stringify(data) : null;
      }
    };
    JSONStorage.__set__("fs", fs);
    return fs
  };

  beforeEach(function() {
    fsMock = mockFilesystem();
    fsMock.__setStorageData([]);

    app = express();
    app.use('/', new JSONStorage({
      filepath: filepath
    }));
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
      request(app).get(path).expect('[]', done);
    });

    it('responds with the content of the JSON file', function(done) {
      var json = [{key: 1}, {key: 2}];
      fsMock.__setStorageData(json);
      request(app).get(path).expect(JSON.stringify(json), done);
    });

    describe('when the file is not found', function() {

      beforeEach(function() {
        fsMock.__setStorageData(null);
      });

      it('responds with 500', function(done) {
        request(app).get(path).expect(500, done);
      });
    });
  });

  describe('POST /bookmarks', function() {

    var path = '/bookmarks';

    describe('with valid payload', function() {

      var payload;

      beforeEach(function() {
        payload = {
          url: 'http://some-url.com',
          tags: '#some #tag'
        };
      });

      it('responds with 201', function(done) {
        request(app)
          .post(path)
          .type('form')
          .send(payload)
          .expect(201, done);
      });
    });

    describe('with invalid payload', function() {

      var payload;

      beforeEach(function() {
        payload = {};
      });

      it('responds with 400', function(done) {
        request(app).post(path)
          .type('form')
          .send(payload)
          .expect(400, done);
      });
    });
  });
});
