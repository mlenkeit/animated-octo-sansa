'use strict';

var sinon = require('sinon');

module.exports = function() {
  var logger = {
    debug: sinon.stub(),
    verbose: sinon.stub(),
    info: sinon.stub(),
    warn: sinon.stub(),
    error: sinon.stub()
  };

  return logger;
};
