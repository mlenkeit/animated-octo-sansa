var React = require('react/addons');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;

var BookmarkForm = require('./BookmarkForm');
var BookmarkList = require('./BookmarkList');
var BookmarkApp = module.exports = React.createClass({

  mixins: [IntlMixin],

  render: function() {
    return (
      <div>
        <BookmarkForm />
        <BookmarkList />
      </div>
    );
  }
});
