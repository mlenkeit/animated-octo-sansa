var React = require('react/addons');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;

var BookmarkForm = require('./BookmarkForm');
var BookmarkList = require('./BookmarkList');
var BookmarkApp = module.exports = React.createClass({

  mixins: [IntlMixin],

  componentDidMount: function() {
    this.props.store.attachChangeListener(this._handleChange);
  },

  componentWillUnmount: function() {
    this.props.store.detachChangeListener(this._handleChange);
  },

  _handleChange: function() {

  },

  render: function() {
    return (
      <div>
        <BookmarkForm />
        <BookmarkList />
      </div>
    );
  }
});
