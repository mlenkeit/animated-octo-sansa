require('./testdom')('<html><body></body></html>');
var expect = require('chai').expect;
var React = require('react/addons');
var sinon = require('sinon');
var TestUtils = React.addons.TestUtils;
var BookmarkForm = require('./../react/BookmarkForm');

describe('BookmarkForm', function() {

  var component, form, testFixture;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(<BookmarkForm />);
    form = TestUtils.findRenderedDOMComponentWithTag(component, 'form');

    testFixture = {
      url: 'http://some-url.com'
    };
    React.findDOMNode(component.refs.url).value = testFixture.url;
  });

  it('should render a form', function() {
    expect(form.getDOMNode().tagName.toLowerCase()).to.equal('form');
  });

  it('should do nothing when the form is submitted', function() {
    TestUtils.Simulate.submit(form);
  });

  describe('with onSubmit handler', function() {

    var handler;

    beforeEach(function() {
      handler = sinon.spy();
      component.setProps({ onSubmit: handler });
    });

    it('should invoke the onSubmit handler with input data when the form is submitted', function() {
      TestUtils.Simulate.submit(form);
      expect(handler.callCount).to.equal(1, 'number of calls');
      var args = handler.args[0];
      expect(args[0]).to.have.property('url', testFixture.url);
    });
  });
});
