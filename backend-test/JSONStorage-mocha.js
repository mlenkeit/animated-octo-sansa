/*global beforeEach, describe, it,*/
/*eslint no-unused-expressions: 0*/
'use strict';

var rewire = require('rewire');
var express = require('express');
var request = require('supertest');
var JSONStorage = rewire('./../backend/JSONStorage');

describe('JSONStorage', function() {

  var app, req,
      filename = 'bookmarks.json', filepath = __dirname + '/' + filename,
      fsMock;

  var mockFilesystem = function() {
    var fs = {
      callWriteFileCallbackWithError: false,
      fileContentsByPath: {},
      readFile: function(path, cb) {
        var content = this.fileContentsByPath[path];
        return process.nextTick(function() {
          return cb(!content, new Buffer(content || ''));
        });
      },
      writeFile: function(path, data, cb) {
        var fail = this.callWriteFileCallbackWithError;
        this.callWriteFileCallbackWithError = false;
        this.fileContentsByPath[path] = data.toString();
        return process.nextTick(function() {
          return cb(fail ? {} : null);
        });
      },
      __setStorageData: function(data) {
        this.fileContentsByPath[filepath] = data ? JSON.stringify(data) : null;
      },
      __getStorageData: function() {
        return this.fileContentsByPath[filepath];
      }
    };
    JSONStorage.__set__('fs', fs);
    return fs;
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

    beforeEach(function() {
      req = request(app).get('/bookmarks');
    });

    it('responds with 200', function(done) {
      req.expect(200, done);
    });

    it('responds in json format', function(done) {
      req.expect('Content-Type', /json/, done);
    });

    it('responds with an empty array by default', function(done) {
      req.expect('[]', done);
    });

    it('responds with the content of the JSON file', function(done) {
      var json = [{key: 1}, {key: 2}];
      fsMock.__setStorageData(json);
      req.expect(JSON.stringify(json), done);
    });

    describe('when the file is not found', function() {

      beforeEach(function() {
        fsMock.__setStorageData(null);
      });

      it('responds with 500', function(done) {
        req.expect(500, done);
      });
    });
  });

  describe('POST /bookmarks', function() {

    beforeEach(function() {
      req = request(app).post('/bookmarks').type('form');
    });

    describe('with valid payload', function() {

      var payload;

      beforeEach(function() {
        payload = {
          url: 'http://some-url.com',
          tags: '#some #tag'
        };
        req.send(payload);
      });

      it('responds with 201', function(done) {
        req.expect(201, done);
      });

      it('adds the bookmark to the end of the JSON file', function(done) {
        fsMock.__setStorageData([{ url: 'initial', tags: '#initial' }]);
        req.expect(function() {
            var json = JSON.parse(fsMock.__getStorageData());
            var lastRecord = json[json.length - 1];
            if (json.length === 0) {
              throw new Error('no record found');
            }
            if (lastRecord.url !== payload.url) {
              throw new Error('url property is not identical');
            }
            if (lastRecord.tags !== payload.tags) {
              throw new Error('tags property is not identical');
            }
          })
          .end(done);
      });

      describe('when the file is not found', function() {

        beforeEach(function() {
          fsMock.__setStorageData(null);
        });

        it('responds with 500', function(done) {
          req.expect(500, done);
        });
      });

      describe('when writing to the file fails', function() {

        beforeEach(function() {
          fsMock.callWriteFileCallbackWithError = true;
        });

        it('responds with 500', function(done) {
          req.expect(500, done);
        });
      });
    });

    describe('with invalid payload', function() {

      var payload;

      beforeEach(function() {
        payload = {};
        req.send(payload);
      });

      it('responds with 400', function(done) {
        req.expect(400, done);
      });
    });
  });
});
