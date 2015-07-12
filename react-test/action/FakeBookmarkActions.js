'use strict';

var sinon = require('sinon');

module.exports = function() {

  this.create = sinon.spy();
  this.refresh = sinon.spy();
};
