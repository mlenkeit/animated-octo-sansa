var React = require('react/addons');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;

var BookmarkListItem = module.exports = React.createClass({

  mixins: [IntlMixin],

  render: function() {
    return (
      <li>
        <a href={this.props.children}>{this.props.children}</a>
      </li>
    );
  }
});
