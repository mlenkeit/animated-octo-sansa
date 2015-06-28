/*global beforeEach, describe, it,*/
/*eslint no-unused-expressions: 0*/
'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var Dispatcher = require('flux').Dispatcher;
var BookmarkActions = require('./../../react/action/BookmarkActions');

describe('BookmarkActions', function() {

  var actions,
      dispatcher;

  beforeEach(function() {
    dispatcher = new Dispatcher();
    sinon.spy(dispatcher, 'dispatch');
    actions = new BookmarkActions(dispatcher);
  });

  describe('create', function() {

    var url, tags;

    beforeEach(function() {
      url = 'http://some-url.com';
      tags = '#someTag';
    });

    it('dispatches a CreateBookmark action', function() {
      actions.create(url, tags);
      var args = dispatcher.dispatch.args[0];
      expect(args[0]).to.be.an('object');
      expect(args[0]).to.have.property('name', 'CreateBookmark');
      expect(args[0]).to.have.property('payload')
        .that.deep.equals({url: url, tags: tags});
    });
  });

});
