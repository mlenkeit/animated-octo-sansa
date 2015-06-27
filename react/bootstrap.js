var React = require('react/addons');
var Dispatcher = require('flux').Dispatcher;

var BookmarkActions = require('./action/BookmarkActions');
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
var actions = new BookmarkActions(dispatcher);
var store = new BookmarksStore(dispatcher);

React.render(
  <BookmarkApp actions={actions} store={store} {...intlData}>
  </BookmarkApp>,
  document.getElementById('root')
);
