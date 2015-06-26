var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Bookmarks = module.exports = function(dispatcher) {

  var data = [];

  dispatcher.register(function(action) {
    var handlerName = 'handle' + action.name;
    if (internals[handlerName]) {
      internals[handlerName](action.payload);
    }
  });

  var internals = {
    handleCreateBookmark: function(payload) {
      data.push(payload);
    }
  };

  this.getAll = function() {
    return data;
  };
};
util.inherits(Bookmarks, EventEmitter);
