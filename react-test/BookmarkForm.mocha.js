require('./testdom')('<html><body></body></html>');
var expect = require('chai').expect;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var BookmarkForm = require('./../react/BookmarkForm');

describe('BookmarkForm', function() {

  it('should render a form', function() {
    var control = TestUtils.renderIntoDocument(<BookmarkForm />);
    var form = TestUtils.findRenderedDOMComponentWithTag(
     control, 'form');
     expect(form.getDOMNode().tagName.toLowerCase()).to.equal('form');
  });
});
