var React = require('react/addons');
var Dispatcher = require('flux').Dispatcher;
var BookmarksStore = require('./store/BookmarksStore');
var BookmarkApp = require('./component/BookmarkApp');

var intlData = {
  locales: 'en-US',
  messages: {
    urlPlaceholder: 'url',
    tagsPlaceholder: 'tags'
  }
};
var dispatcher = new Dispatcher();
var store = new BookmarksStore(dispatcher);

React.render(
  <BookmarkApp store={store} {...intlData}>
  </BookmarkApp>,
  document.getElementById('root')
);
