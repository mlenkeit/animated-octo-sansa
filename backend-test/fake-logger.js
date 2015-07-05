'use strict';

var sinon = require('sinon');

module.exports = function() {
  return {
    debug: sinon.spy(),
    verbose: sinon.spy(),
    info: sinon.spy(),
    warn: sinon.spy(),
    error: sinon.spy()
  };
};
