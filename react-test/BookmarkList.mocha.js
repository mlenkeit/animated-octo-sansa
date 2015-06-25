require('./testdom')('<html><body></body></html>');
var expect = require('chai').expect;
var React = require('react/addons');
var sinon = require('sinon');
var TestUtils = React.addons.TestUtils;
var BookmarkList = require('./../react/BookmarkList');
var BookmarkListItem = require('./../react/BookmarkListItem');

describe('BookmarkList', function() {

  var component;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(<BookmarkList />);
  });

  it('renders a dom element', function() {
    expect(component.getDOMNode().tagName.toLowerCase()).to.be.not.empty;
  });

  describe('with data', function() {

    var data,
        items;

    beforeEach(function() {
      data = [1, 23, 42, 678].map(v => ({
        url: `http://some-url.com/${v}`,
        tags: `#static #${v}`
      }));
      component.setProps({data: data});
      items = TestUtils.scryRenderedComponentsWithType(component, BookmarkListItem);
    });

    it('displays a BookmarkListItem for each data element', function() {
      expect(items).to.have.length.of(data.length);
    });

    it('passes the url as children to the BookmarkListItem', function() {
      items.forEach((item, idx) =>
        expect(item.props.children).to.equal(data[idx].url));
    });

    it('passes the tags via the tags attribute to the BookmarkListItem', function() {
      items.forEach((item, idx) =>
        expect(item.props.tags).to.equal(data[idx].tags));
    });
  });
});
