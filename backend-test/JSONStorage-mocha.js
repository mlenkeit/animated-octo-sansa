/*global beforeEach, describe, it,*/
/*eslint no-unused-expressions: 0*/
'use strict';

var rewire = require('rewire');
var expect = require('chai').expect;
var express = require('express');
var request = require('supertest');
var JSONStorage = rewire('./../backend/JSONStorage');
var Logger = require('./FakeLogger');
var sinon = require('sinon');

function logsAnErrorViaTheLogger(done, req, config) {
  req.expect(function() {
    expect(config.logger.error.calledWith(sinon.match.string)).to.be.true;
    done();
  }).end();
}

describe('JSONStorage', function() {

  var filename = 'bookmarks.json', filepath = __dirname + '/' + filename,
      config;

  beforeEach(function() {
    config = {
      filepath: filepath,
      logger: new Logger()
    };
  });

  it('is an express application', function() {
    var middleware = new JSONStorage(config);
    expect(middleware.path).to.be.a('function', 'duck-typing for path()');
    expect(middleware).to.ownProperty('mountpath', 'duck-typing for mountpath');
  });

  describe('constructor()', function() {

    it('throws an exception when created without filepath', function() {
      delete config.filepath;
      expect(function() {
        /*eslint no-new: 0*/
        new JSONStorage(config);
      }).to.throw(/mandatory.*filepath/i);
    });

    it('throws an exception when created without logger', function() {
      delete config.logger;
      expect(function() {
        /*eslint no-new: 0*/
        new JSONStorage(config);
      }).to.throw(/mandatory.*logger/i);
    });
  });

  describe('when mounted', function() {

    var app, req,
        fsMock;

    var RANDOM_INVALID_PATH = '/invalid-path';
    var STORAGE_DATA_FILE_NOT_FOUND = null;

    beforeEach(function() {
      fsMock = require('./fs-mock')();
      fsMock.__setStorageData = function(data) {
        fsMock.readFileStub.withArgs(filepath).returns(data ? JSON.stringify(data) : null);
      };
      fsMock.__getStorageData = function() {
        var data = fsMock.writeFileStub.args.length > 0 ?
          fsMock.writeFileStub.args[fsMock.writeFileStub.args.length - 1][1] :
          fsMock.readFileStub(filepath);
        return data;
      };
      JSONStorage.__set__('fs', fsMock);
      fsMock.__setStorageData([]);

      app = express();
      app.use('/', new JSONStorage(config));
    });

    it('does not process any request until the json file is creaed', function(done) {
      fsMock.existsStub.withArgs(filepath).returns(false);
      fsMock.writeFileStub.withArgs(filepath).returns(true);
      request(app).get(RANDOM_INVALID_PATH).end(function() {
        expect(fsMock.exists.callCount).to.equal(1, 'fs.exists callCount');
        expect(fsMock.writeFile.callCount).to.equal(1, 'fs.writeFile callCount');
        done();
      });
    });

    it('processes requests directly if the json file exists', function(done) {
      fsMock.existsStub.withArgs(filepath).returns(true);
      request(app).get(RANDOM_INVALID_PATH).expect(404).end(function() {
        expect(fsMock.writeFile.callCount).to.equal(0, 'fs.writeFile callCount');
        done();
      });
    });

    describe('GET /', function() {

      beforeEach(function() {
        req = request(app).get('/');
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
          fsMock.__setStorageData(STORAGE_DATA_FILE_NOT_FOUND);
        });

        it('responds with 500', function(done) {
          req.expect(500, done);
        });

        it('logs an error via the logger', function(done) {
          logsAnErrorViaTheLogger(done, req, config);
        });
      });
    });

    describe('POST /', function() {

      beforeEach(function() {
        req = request(app).post('/').type('form');
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
              expect(json).to.have.length.above(0);
              expect(lastRecord.url).to.equal(payload.url);
              expect(lastRecord.tags).to.equal(payload.tags);
            })
            .end(done);
        });

        describe('when the file is not found', function() {

          beforeEach(function() {
            fsMock.__setStorageData(STORAGE_DATA_FILE_NOT_FOUND);
          });

          it('responds with 500', function(done) {
            req.expect(500, done);
          });

          it('logs an error via the logger', function(done) {
            logsAnErrorViaTheLogger(done, req, config);
          });
        });

        describe('when writing to the file fails', function() {

          beforeEach(function() {
            fsMock.writeFileStub.returns(false);
          });

          it('responds with 500', function(done) {
            req.expect(500, done);
          });

          it('logs an error via the logger', function(done) {
            logsAnErrorViaTheLogger(done, req, config);
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

        it('logs an error via the logger', function(done) {
          logsAnErrorViaTheLogger(done, req, config);
        });
      });
    });
  });
});
