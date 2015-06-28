'use strict';

var React = require('react/addons');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var BookmarkForm = require('./BookmarkForm');
var BookmarkList = require('./BookmarkList');

module.exports = React.createClass({

  mixins: [IntlMixin],

  componentDidMount: function() {
    this.props.store.attachChangeListener(this._handleChange);
  },

  componentWillUnmount: function() {
    this.props.store.detachChangeListener(this._handleChange);
  },

  getInitialState: function() {
    return {
      bookmarks: this.props.store.getAll()
    };
  },

  _handleChange: function() {
    this.setState({
      bookmarks: this.props.store.getAll()
    });
  },

  _handleSubmit: function(data) {
    this.props.actions.create(data.url, data.tags);
  },

  render: function() {
    return (
      <div>
        <BookmarkForm onSubmit={this._handleSubmit}/>
        <BookmarkList bookmarks={this.state.bookmarks} />
      </div>
    );
  }
});
