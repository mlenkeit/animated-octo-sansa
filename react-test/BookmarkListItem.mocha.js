require('./testdom')('<html><body></body></html>');
var expect = require('chai').expect;
var React = require('react/addons');
var sinon = require('sinon');
var TestUtils = React.addons.TestUtils;
var BookmarkListItem = require('./../react/BookmarkListItem');

describe('BookmarkListItem', function() {

  var component,
    testFixture;

  beforeEach(function() {
    testFixture = {
      url: 'http://some-url.com',
      tags: '#aTag #more'
    };

    component = TestUtils.renderIntoDocument(<BookmarkListItem>{testFixture.url}</BookmarkListItem>);
  });

  it('renders a li element', function() {
    expect(component.getDOMNode().tagName.toLowerCase()).to.equal('li');
  });

  it('renders the url as anchor', function() {
    var anchor = TestUtils.findRenderedDOMComponentWithTag(component, 'a');
    expect(anchor.getDOMNode().getAttribute('href')).to.equal(testFixture.url);
    expect(anchor.getDOMNode().textContent).to.equal(testFixture.url);
  });
});
