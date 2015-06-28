/*global beforeEach, describe, it,*/
/*eslint no-unused-expressions: 0*/
'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var Dispatcher = require('flux').Dispatcher;
var BookmarksStore = require('./../../react/store/BookmarksStore');

describe('BookmarksStore', function() {

  var store,
      dispatcher;

  beforeEach(function() {
    dispatcher = new Dispatcher();
    store = new BookmarksStore(dispatcher);
  });

  describe('getAll', function() {

    it('returns an empty array initially', function() {
      expect(store.getAll()).to.have.length.of(0);
    });

    it('returns always a different array reference', function() {
      expect(store.getAll()).to.not.equal(store.getAll());
    });
  });

  describe('with change listeners', function() {

    var attachedChangeListener, detachedChangeListener;

    beforeEach(function() {
      attachedChangeListener = sinon.spy();
      detachedChangeListener = sinon.spy();
      store.attachChangeListener(attachedChangeListener);
      store.attachChangeListener(detachedChangeListener);
      store.detachChangeListener(detachedChangeListener);
    });

    describe('when a CreateBookmark action is dispatched', function() {

      var bookmark;

      beforeEach(function() {
        bookmark = {
          url: 'http://some-url.com',
          tags: '#aTag'
        };
        dispatcher.dispatch({
          name: 'CreateBookmark',
          payload: bookmark
        });
      });

      it('adds the bookmark to the store (optimistically)', function() {
        var bookmarks = store.getAll();
        expect(bookmarks).to.have.length.of(1);
        expect(bookmarks[0]).to.deep.equal({
          url: bookmark.url,
          tags: bookmark.tags
        });
        expect(bookmarks[0]).to.not.equal(bookmark, 'not contain the same object reference');
      });

      it('notifies change listeners', function() {
        expect(attachedChangeListener.called).to.equal(true, 'attached listener');
        expect(detachedChangeListener.called).to.equal(false, 'detached listener');
      });
    });

    describe('when an UpdateBookmark action is dispatched', function() {

      var bookmark;

      beforeEach(function() {
        // make sure the bookmark is created before update
        bookmark = {
          url: 'http://some-url.com',
          tags: '#aTag'
        };
        dispatcher.dispatch({
          name: 'CreateBookmark',
          payload: bookmark
        });

        attachedChangeListener.reset();
        detachedChangeListener.reset();

        bookmark.tags += ' #anotherTag';
        dispatcher.dispatch({
          name: 'UpdateBookmark',
          payload: bookmark
        });
      });

      it('updates the bookmark in the store', function() {
        var bookmarks = store.getAll();
        expect(bookmarks).to.have.length.of(1);
        expect(bookmarks).to.have.deep.property('[0].tags', bookmark.tags);
      });

      it('notifies change listeners', function() {
        expect(attachedChangeListener.called).to.equal(true, 'attached listener');
        expect(detachedChangeListener.called).to.equal(false, 'detached listener');
      });
    });
  });
});
