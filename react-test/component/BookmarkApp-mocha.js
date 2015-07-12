/*global beforeEach, describe, it,*/
/*eslint no-unused-expressions: 0*/
'use strict';

require('./testdom')('<html><body></body></html>');
var expect = require('chai').expect;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var BookmarkActions = require('./../action/FakeBookmarkActions');
var BookmarkApp = require('./../../react/component/BookmarkApp');
var BookmarkForm = require('./../../react/component/BookmarkForm');
var BookmarkList = require('./../../react/component/BookmarkList');
var BookmarksStore = require('./../store/FakeBookmarksStore');

describe('BookmarkApp', function() {

  var component,
    intlDataFixture,
    bookmarkActions, bookmarksStore;

  beforeEach(function() {
    intlDataFixture = {
      locales: 'en-US',
      messages: {
        urlPlaceholder: 'url',
        tagsPlaceholder: 'tags'
      }
    };
    bookmarkActions = new BookmarkActions();
    bookmarksStore = new BookmarksStore();
    component = TestUtils.renderIntoDocument(<BookmarkApp actions={bookmarkActions} store={bookmarksStore} {...intlDataFixture} />);
  });

  it('renders a dom element', function() {
    expect(component.getDOMNode().tagName.toLowerCase()).to.be.not.empty;
  });

  it('renders a BookmarkForm component', function() {
    var formComponent = TestUtils.findRenderedComponentWithType(component, BookmarkForm);
    expect(formComponent).to.be.ok;
  });

  it('renders a BookmarkList component', function() {
    var listComponent = TestUtils.findRenderedComponentWithType(component, BookmarkList);
    expect(listComponent).to.be.ok;
  });

  it('attaches as change listener to the BookmarksStore', function() {
    expect(bookmarksStore.attachChangeListener.called).to.be.true;
  });

  it('passes the bookmarks from the store to the BookmarkList component', function() {
    var listComponent = TestUtils.findRenderedComponentWithType(component, BookmarkList);
    expect(listComponent.props.bookmarks).to.equal(bookmarksStore.getAll());
  });

  it('triggers the refresh action', function() {
    expect(bookmarkActions.refresh.called).to.be.true;
  });

  describe('when the form is submitted', function() {

    var formComponent,
      url, tags;

    beforeEach(function() {
      url = 'http://some-url.com';
      tags = '#someTag';

      formComponent = TestUtils.findRenderedComponentWithType(component, BookmarkForm);
      formComponent.props.onSubmit({
        url: url,
        tags: tags
      });
    });

    it('triggers the create action', function() {
      expect(bookmarkActions.create.called).to.be.true;
      var args = bookmarkActions.create.args[0];
      expect(args[0]).to.equal(url);
      expect(args[1]).to.equal(tags);
    });
  });

  describe('when the BookmarksStore notifies change listeners', function() {

    var newBookmarks;

    beforeEach(function() {
      newBookmarks = [];
      bookmarksStore.__simulateUpdateBookmarks(newBookmarks);
    });

    it('passes the updated bookmarks from the store to the BookmarkList component', function() {
      var listComponent = TestUtils.findRenderedComponentWithType(component, BookmarkList);
      expect(listComponent.props.bookmarks).to.equal(newBookmarks);
    });
  });

  describe('when unmounted', function() {

    beforeEach(function() {
      React.unmountComponentAtNode(React.findDOMNode(component).parentNode);
    });

    it('detaches as change listener from the BookmarksStore', function() {
      expect(bookmarksStore.detachChangeListener.called).to.be.true;
    });
  });
});
