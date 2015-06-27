require('./testdom')('<html><body></body></html>');
var expect = require('chai').expect;
var React = require('react/addons');
var sinon = require('sinon');
var TestUtils = React.addons.TestUtils;

var BookmarkApp = require('./../../react/component/BookmarkApp');
var BookmarkForm = require('./../../react/component/BookmarkForm');
var BookmarkList = require('./../../react/component/BookmarkList');
var BookmarksStore = require('./../store/FakeBookmarksStore');

describe('BookmarkApp', function() {

  var component,
    intlDataFixture,
    bookmarksStore;

  beforeEach(function() {
    intlDataFixture = {
      locales: 'en-US',
      messages: {
        urlPlaceholder: 'url',
        tagsPlaceholder: 'tags'
      }
    };
    bookmarksStore = new BookmarksStore();
    component = TestUtils.renderIntoDocument(<BookmarkApp store={bookmarksStore} {...intlDataFixture} />);
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

  describe('when unmounted', function() {

    beforeEach(function() {
      React.unmountComponentAtNode(React.findDOMNode(component).parentNode);
    });

    it('detaches as change listener from the BookmarksStore', function() {
      expect(bookmarksStore.detachChangeListener.called).to.be.true;
    });
  });
});
