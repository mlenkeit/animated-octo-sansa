require('./testdom')('<html><body></body></html>');
var expect = require('chai').expect;
var React = require('react/addons');
var sinon = require('sinon');
var TestUtils = React.addons.TestUtils;

var BookmarkApp = require('./../react/BookmarkApp');
var BookmarkForm = require('./../react/BookmarkForm');
var BookmarkList = require('./../react/BookmarkList');

describe('BookmarkApp', function() {

  var component,
    intlDataFixture;

  beforeEach(function() {
    intlDataFixture = {
      locales: 'en-US',
      messages: {
        urlPlaceholder: 'url',
        tagsPlaceholder: 'tags'
      }
    };
    component = TestUtils.renderIntoDocument(<BookmarkApp {...intlDataFixture} />);
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
});
