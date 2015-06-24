require('./testdom')('<html><body></body></html>');
var expect = require('chai').expect;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var BookmarkForm = require('./../react/BookmarkForm');

describe('BookmarkForm', function() {

  var component, form;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(<BookmarkForm />);
    form = TestUtils.findRenderedDOMComponentWithTag(component, 'form');
  });

  it('should render a form', function() {
    expect(form.getDOMNode().tagName.toLowerCase()).to.equal('form');
  });
});
