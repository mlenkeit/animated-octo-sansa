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

  _handleSubmit: function(data) {
    this.props.actions.create(data.url, data.tags);
  },

  render: function() {
    return (
      <div>
        <BookmarkForm onSubmit={this._handleSubmit}/>
        <BookmarkList bookmarks={this.props.store.getAll()} />
      </div>
    );
  }
});
