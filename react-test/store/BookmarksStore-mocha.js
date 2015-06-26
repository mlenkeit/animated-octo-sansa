var expect = require('chai').expect;
var sinon = require('sinon');

var EventEmitter = require('events').EventEmitter;
var BookmarksStore = require('./../../react/store/BookmarksStore');

describe('BookmarksStore', function() {

  var store;

  beforeEach(function() {
    store = new BookmarksStore();
  });

  it('is an EventEmitter', function() {
    expect(store).to.be.an.instanceof(EventEmitter);
  });

  describe('getAll', function() {

    it('returns an empty array initially', function() {
      expect(store.getAll()).to.have.length.of(0);
    });
  });
});
