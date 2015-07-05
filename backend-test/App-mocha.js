/*global afterEach, beforeEach, describe, it,*/
/*eslint no-unused-expressions: 0*/
'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
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

  var app, JSONStorage, express,
      filepath = 'bookmarks.json', staticFiles = 'static';

  beforeEach(function() {
    JSONStorage = spyOnConstructor(App.__get__('JSONStorage'));
    App.__set__('JSONStorage', JSONStorage);

    express = App.__get__('express');
    sinon.spy(express, 'static');

    app = new App({
      filepath: filepath,
      serve: staticFiles
    });
    sinon.spy(app, 'use');
  });

  afterEach(function() {
    express.static.restore();
    JSONStorage.reset();
  });

  it('is an express application', function() {
    expect(app.listen).to.be.a('function', 'duck-typing for listen()');
  });

  it('mounts a JSONStorage middleware to /api/bookmarks', function() {
    var middleware = JSONStorage.returnValues[0];
    expect(middleware.mountpath).to.equal('/api/bookmarks');
  });

  it('passes the filepath to the JSONStorage middleware', function() {
    var args = JSONStorage.args[0];
    expect(args[0].filepath).to.equal(filepath);
  });

  it('mounts the static files as per config parameter to the root path', function() {
    expect(express.static.called).to.equal(true, 'express.static called');
    expect(express.static.args[0][0]).to.equal(staticFiles);
  });
});
