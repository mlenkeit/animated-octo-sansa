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
});
