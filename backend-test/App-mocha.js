/*global afterEach, beforeEach, describe, it,*/
/*eslint no-unused-expressions: 0*/
'use strict';

var expect = require('chai').expect;
var rewire = require('rewire');
var App = rewire('./../backend/App');

function spyOnConstructor(Constructor) {
  var spy = function() {
    var instance = Constructor.apply(null, arguments);
    spy.args.push(arguments);
    spy.returnValues.push(instance);
    return instance;
  };
  spy.reset = function() {
    spy.args = [];
    spy.returnValues = [];
  };
  spy.reset();
  return spy;
}

describe('App', function() {

  var app, JSONStorage,
      filepath = 'bookmarks.json';

  beforeEach(function() {
    JSONStorage = spyOnConstructor(App.__get__('JSONStorage'));
    App.__set__('JSONStorage', JSONStorage);

    app = new App({
      filepath: filepath
    });
  });

  afterEach(function() {
    JSONStorage.reset();
  });

  it('is an express application', function() {
    expect(app.listen).to.be.a('function', 'duck-typing for listen()');
  });

  it('mounts a JSONStorage middleware to /bookmarks', function() {
    var middleware = JSONStorage.returnValues[0];
    expect(middleware.mountpath).to.equal('/bookmarks');
  });

  it('passes the filepath to the JSONStorage middleware', function() {
    var args = JSONStorage.args[0];
    expect(args[0].filepath).to.equal(filepath);
  });
});
