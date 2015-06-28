/*global beforeEach, describe, it,*/
/*eslint no-unused-expressions: 0*/
'use strict';

require('./testdom')('<html><body></body></html>');
var expect = require('chai').expect;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var BookmarkList = require('./../../react/component/BookmarkList');
var BookmarkListItem = require('./../../react/component/BookmarkListItem');

describe('BookmarkList', function() {

  var component;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(<BookmarkList />);
  });

  it('renders a dom element', function() {
    expect(component.getDOMNode().tagName.toLowerCase()).to.be.not.empty;
  });

  describe('with bookmarks', function() {

    var bookmarks,
        items;

    beforeEach(function() {
      bookmarks = [1, 23, 42, 678].map(v => ({
        url: `http://some-url.com/${v}`,
        tags: `#static #${v}`
      }));
      component.setProps({bookmarks: bookmarks});
      items = TestUtils.scryRenderedComponentsWithType(component, BookmarkListItem);
    });

    it('displays a BookmarkListItem for each data element', function() {
      expect(items).to.have.length.of(bookmarks.length);
    });

    it('passes the url as children to the BookmarkListItem', function() {
      items.forEach((item, idx) =>
        expect(item.props.children).to.equal(bookmarks[idx].url));
    });

    it('passes the tags via the tags attribute to the BookmarkListItem', function() {
      items.forEach((item, idx) =>
        expect(item.props.tags).to.equal(bookmarks[idx].tags));
    });
  });
});
