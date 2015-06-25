var expect = require('chai').expect;
var sinon = require('sinon');

var BookmarksStore = require('./../../react/store/Bookmarks');

describe('BookmarksStore', function() {

  var store;

  beforeEach(function() {
    store = BookmarksStore;
  });

  describe('getAll', function() {

    it('returns an empty array initially', function() {
      expect(store.getAll()).to.have.length.of(0);
    });
  });
});
