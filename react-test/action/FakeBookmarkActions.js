var sinon = require('sinon');

var FakeBookmarkActions = module.exports = function() {

  this.create = sinon.spy();
};
