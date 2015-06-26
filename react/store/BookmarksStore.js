var EventEmitter = require('events').EventEmitter;

var Bookmarks = module.exports = function(dispatcher) {

  var eventEmitter = new EventEmitter();
  var CHANGE_EVENT = 'change';

  var data = [];

  dispatcher.register(function(action) {
    var handlerName = 'handle' + action.name;
    if (internals[handlerName]) {
      internals[handlerName](action.payload);
    }
  });

  var internals = {
    handleCreateBookmark: function(payload) {
      data.push({
        url: payload.url,
        tags: payload.tags
      });
      eventEmitter.emit(CHANGE_EVENT);
    },
    handleUpdateBookmark: function(payload) {
      data.forEach(function(bookmark) {
        if (bookmark.url === payload.url) {
          bookmark.tags = payload.tags;
          eventEmitter.emit(CHANGE_EVENT);
          return false;
        }
      });
    }
  };

  this.getAll = function() {
    return data.slice(0);
  };

  this.attachChangeListener = function(callback) {
    eventEmitter.on(CHANGE_EVENT, callback);
  };

  this.detachChangeListener = function(callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback);
  };
};
