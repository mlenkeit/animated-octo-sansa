var sinon = require('sinon');
var EventEmitter = require('events').EventEmitter;

var FakeBookmarksStore = module.exports = function() {

  var eventEmitter = new EventEmitter();
  var CHANGE_EVENT = 'change';

  this.getAll = sinon.stub().returns([]);

  this.attachChangeListener = sinon.spy(function(callback) {
    eventEmitter.on(CHANGE_EVENT, callback);
  });

  this.detachChangeListener = sinon.spy(function(callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback);
  });
};
