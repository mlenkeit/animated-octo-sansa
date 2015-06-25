require('./testdom')('<html><body></body></html>');
var expect = require('chai').expect;
var React = require('react/addons');
var sinon = require('sinon');
var TestUtils = React.addons.TestUtils;
var BookmarkApp = require('./../react/BookmarkApp');

describe('BookmarkApp', function() {

  var component,
    testFixture;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(<BookmarkApp />);
  });

  it('renders a dom element', function() {
    expect(component.getDOMNode().tagName.toLowerCase()).to.be.not.empty;
  });
});
