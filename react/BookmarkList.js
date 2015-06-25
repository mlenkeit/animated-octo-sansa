var React = require('react/addons');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var BookmarkListItem = require('./BookmarkListItem');

var BookmarkList = module.exports = React.createClass({

  mixins: [IntlMixin],

  render: function() {
    var data = this.props.data || [];
    return (
      <ul>
        {data.map(function(bookmark, index) {
          return (
            <BookmarkListItem key={index} tags={bookmark.tags}>
              {bookmark.url}
            </BookmarkListItem>
          );
        })}
      </ul>
    );
  }
});
