var expect = require('chai').expect;
var sinon = require('sinon');

var Dispatcher = require('flux').Dispatcher;
var EventEmitter = require('events').EventEmitter;
var BookmarksStore = require('./../../react/store/BookmarksStore');

describe('BookmarksStore', function() {

  var store,
      dispatcher;

  beforeEach(function() {
    dispatcher = new Dispatcher();
    store = new BookmarksStore(dispatcher);
  });

  it('is an EventEmitter', function() {
    expect(store).to.be.an.instanceof(EventEmitter);
  });

  describe('getAll', function() {

    it('returns an empty array initially', function() {
      expect(store.getAll()).to.have.length.of(0);
    });
  });

  describe('when a CreateBookmark action is dispatched', function() {

    beforeEach(function() {
      dispatcher.dispatch({
        name: 'CreateBookmark',
        payload: {
          url: 'http://some-url.com',
          tags: '#aTag'
        }
      });
    });

    it('adds the bookmark to the store (optimistically)', function() {
      expect(store.getAll()).to.have.length.of(1);
    });
  });
});
