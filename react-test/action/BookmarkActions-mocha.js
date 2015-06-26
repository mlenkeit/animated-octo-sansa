/*global beforeEach, describe, it,*/
/*eslint no-unused-expressions: 0*/
'use strict';

var expect = require('chai').expect;
var nock = require('nock');
var sinon = require('sinon');
var Dispatcher = require('flux').Dispatcher;
var BookmarkActions = require('./../../react/action/BookmarkActions');

describe('BookmarkActions', function() {

  var actions,
      dispatcher, host;

  beforeEach(function() {
    dispatcher = new Dispatcher();
    sinon.spy(dispatcher, 'dispatch');
    host = 'http://random-host.com';
    actions = new BookmarkActions(dispatcher, host);
  });

  describe('create()', function() {

    var url, tags,
        nockScope;

    function assertCorrectActionPayload(action) {
      expect(action).to.have.property('payload')
        .that.deep.equals({url: url, tags: tags});
    }

    beforeEach(function() {
      url = 'http://some-url.com';
      tags = '#someTag';

      nockScope = nock(host);
    });

    it('dispatches a CreateBookmark action', function() {
      actions.create(url, tags);
      var args = dispatcher.dispatch.args[0];
      expect(args[0]).to.be.an('object');
      expect(args[0]).to.have.property('name', 'CreateBookmark');
      expect(args[0]).to.have.property('payload')
        .that.deep.equals({url: url, tags: tags});
    });

    it('dispatches a CreateBookmarkSuccess action after a successful POST request to /api/bookmarks', function(done) {
      nockScope.post('/api/bookmarks', {
        url: url,
        tags: tags
      })
      .reply(201);

      dispatcher.register(function(action) {
        if (action.name === 'CreateBookmarkSuccess') {
          assertCorrectActionPayload(action);
          nockScope.done();
          done();
        }
      });

      actions.create(url, tags);
    });

    it('disptaches a CreateBookmarkFailure action after a failed POST request to /api/bookmarks', function(done) {
      nockScope.post('/api/bookmarks', {
        url: url,
        tags: tags
      })
      .reply(500);

      dispatcher.register(function(action) {
        if (action.name === 'CreateBookmarkFailure') {
          assertCorrectActionPayload(action);
          nockScope.done();
          done();
        }
      });

      actions.create(url, tags);
    });
  });

});
