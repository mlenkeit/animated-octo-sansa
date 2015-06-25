var React = require('react/addons');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;

var BookmarkForm = module.exports = React.createClass({

  mixins: [IntlMixin],

  handleSubmit: function() {
    if (!this.props.onSubmit) {
      return;
    }

    var urlInput = React.findDOMNode(this.refs.url),
        tagsInput = React.findDOMNode(this.refs.tags),
        url = urlInput.value.trim(),
        tags = tagsInput.value.trim();

    this.props.onSubmit({
      url: url,
      tags : tags
    });

    urlInput.value = '';
    tagsInput.value = '';
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder={this.formatMessage(this.getIntlMessage('urlPlaceholder'))}
          ref="url" />
        <input
          type="text"
          placeholder={this.formatMessage(this.getIntlMessage('tagsPlaceholder'))}
          ref="tags" />
        <input type="submit" />
      </form>
    );
  }
});
