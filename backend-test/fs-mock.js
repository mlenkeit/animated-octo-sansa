'use strict';

var sinon = require('sinon');

var fs = module.exports = {
  existsStub: sinon.stub(),
  exists: sinon.spy(function(path, cb) {
    var exists = fs.existsStub(path);
    return process.nextTick(function() {
      return cb(exists);
    });
  }),
  readFileStub: sinon.stub(),
  readFile: function(path, cb) {
    var content = fs.readFileStub(path);
    var err = content ? null : {};
    return process.nextTick(function() {
      return cb(err, new Buffer(content || ''));
    });
  },
  writeFileStub: sinon.stub().returns(true),
  writeFile: function(path, data, cb) {
    var fail = !fs.writeFileStub(path, data);
    return process.nextTick(function() {
      return cb(fail ? {} : null);
    });
  }
};
