var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Bookmarks = module.exports = function() {

  this.getAll = function() {
    return [];
  }
};
util.inherits(Bookmarks, EventEmitter);
