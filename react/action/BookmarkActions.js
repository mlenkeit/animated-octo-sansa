'use strict';

var request = require('superagent');

module.exports = function(dispatcher, host) {

  this.create = function(url, tags) {
    dispatcher.dispatch({
      name: 'CreateBookmark',
      payload: {
        url: url,
        tags: tags
      }
    });

    request.post(host + '/api/bookmarks')
      .send({
        url: url,
        tags: tags
      })
      .end(function(err) {
        if (err) {
          return dispatcher.dispatch({
            name: 'CreateBookmarkFailure',
            payload: {
              url: url,
              tags: tags
            }
          });
        }
        dispatcher.dispatch({
          name: 'CreateBookmarkSuccess',
          payload: {
            url: url,
            tags: tags
          }
        });
      });
  };

  this.refresh = function() {
    request.get(host + '/api/bookmarks')
      .end(function(err, res) {
        if (err) {
          return dispatcher.dispatch({
            name: 'RefreshBookmarksFailure'
          });
        }
        dispatcher.dispatch({
          name: 'RefreshBookmarksSuccess',
          payload: res.body
        });
      });
  };
};
