require('./testdom')('<html><body></body></html>');
var expect = require('chai').expect;
var React = require('react/addons');
var sinon = require('sinon');
var TestUtils = React.addons.TestUtils;
var BookmarkList = require('./../react/BookmarkList');

describe('BookmarkList', function() {

  var component;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(<BookmarkList />);
  });

  it('renders a dom element', function() {
    expect(component.getDOMNode().tagName.toLowerCase()).to.be.not.empty;
  });

  describe('with data', function() {

    var data;

    beforeEach(function() {
      data = [1, 23, 42, 678].map(v => ({
        url: `http://some-url.com/${v}`,
        tags: `#static #${v}`
      }));
      component.setProps({data: data});
    });

    it('displays a dom element for each data element', function() {
      var items = TestUtils.scryRenderedDOMComponentsWithTag(component, 'li');
      expect(items).to.have.length.of(data.length);
    });
  });
});
