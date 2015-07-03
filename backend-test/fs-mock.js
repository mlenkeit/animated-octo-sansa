'use strict';

var sinon = require('sinon');

module.exports = function() {
  var fs = {
    existsStub: sinon.stub(),
    exists: sinon.spy(function(path, cb) {
      var exists = fs.existsStub(path);
      return process.nextTick(function() {
        return cb(exists);
      });
    }),
    readFileStub: sinon.stub(),
    readFile: sinon.spy(function(path, cb) {
      var content = fs.readFileStub(path);
      var err = content ? null : {};
      return process.nextTick(function() {
        return cb(err, new Buffer(content || ''));
      });
    }),
    writeFileStub: sinon.stub().returns(true),
    writeFile: sinon.spy(function(path, data, cb) {
      var fail = !fs.writeFileStub(path, data);
      return process.nextTick(function() {
        return cb(fail ? {} : null);
      });
    })
  };
  return fs;
};
