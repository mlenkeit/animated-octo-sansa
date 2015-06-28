'use strict';

module.exports = function(dispatcher) {

  this.create = function(url, tags) {
    dispatcher.dispatch({
      name: 'CreateBookmark',
      payload: {
        url: url,
        tags: tags
      }
    });
  };
};
