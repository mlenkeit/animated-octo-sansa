/*global beforeEach, describe, it,*/
/*eslint no-unused-expressions: 0*/
'use strict';

describe('logger', function() {

  var logger,
      msg, metadata;

  beforeEach(function() {
    logger = require('./../backend/logger')();
    msg = 'some message';
    metadata = {};
  });

  describe('debug()', function() {

    it('takes a message and a metadata object', function() {
      logger.debug(msg, metadata);
    });
  });

  describe('verbose()', function() {

    it('takes a message and a metadata object', function() {
      logger.verbose(msg, metadata);
    });
  });

  describe('info()', function() {

    it('takes a message and a metadata object', function() {
      logger.info(msg, metadata);
    });
  });

  describe('warn()', function() {

    it('takes a message and a metadata object', function() {
      logger.warn(msg, metadata);
    });
  });

  describe('error()', function() {

    it('takes a message and a metadata object', function() {
      logger.error(msg, metadata);
    });
  });
});
