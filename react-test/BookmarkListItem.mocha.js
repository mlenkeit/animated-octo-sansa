require('./testdom')('<html><body></body></html>');
var expect = require('chai').expect;
var React = require('react/addons');
var sinon = require('sinon');
var TestUtils = React.addons.TestUtils;
var BookmarkListItem = require('./../react/BookmarkListItem');

describe('BookmarkListItem', function() {

  var component;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(<BookmarkListItem />);
  });

  it('renders a li element', function() {
    expect(component.getDOMNode().tagName.toLowerCase()).to.equal('li');
  });
});
