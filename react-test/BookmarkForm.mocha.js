require('./testdom')('<html><body></body></html>');
var expect = require('chai').expect;
var React = require('react/addons');
var sinon = require('sinon');
var TestUtils = React.addons.TestUtils;
var BookmarkForm = require('./../react/BookmarkForm');

describe('BookmarkForm', function() {

  var component, form, urlInput, tagsInput, testFixture;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(<BookmarkForm />);
    form = TestUtils.findRenderedDOMComponentWithTag(component, 'form');
    urlInput = React.findDOMNode(component.refs.url);
    tagsInput = React.findDOMNode(component.refs.tags);

    testFixture = {
      url: 'http://some-url.com',
      tags: '#one #two'
    };
    urlInput.value = testFixture.url;
    tagsInput.value = testFixture.tags;
  });

  it('renders a form', function() {
    expect(form.getDOMNode().tagName.toLowerCase()).to.equal('form');
  });

  it('renders an input for the url', function() {
    expect(urlInput.tagName.toLowerCase()).to.equal('input');
  });

  it('renders an input for the tags', function() {
    expect(tagsInput.tagName.toLowerCase()).to.equal('input');
  });

  it('does nothing when the form is submitted', function() {
    TestUtils.Simulate.submit(form);
  });

  describe('with onSubmit handler', function() {

    var handler;

    beforeEach(function() {
      handler = sinon.spy();
      component.setProps({ onSubmit: handler });
    });

    describe('when the form is submitted', function() {

      beforeEach(function() {
        TestUtils.Simulate.submit(form);
      });

      it('invokes the onSubmit handler with input data', function() {
        expect(handler.callCount).to.equal(1, 'number of calls');
      });

      it('passes the url to the onSubmit handler', function() {
        var args = handler.args[0];
        expect(args[0]).to.have.property('url', testFixture.url);
      });

      it('passed the tags to the onSubmit handler', function() {
        var args = handler.args[0];
        expect(args[0]).to.have.property('tags', testFixture.tags);
      });

      it('clears the url input', function() {
        var url = urlInput.value;
        expect(url).to.be.empty;
      });
    });
  });
});
