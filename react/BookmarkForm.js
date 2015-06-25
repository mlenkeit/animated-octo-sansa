var React = require('react/addons');
var BookmarkForm = React.createClass({
  handleSubmit: function() {
    if (this.props.onSubmit) {
      var urlInput = React.findDOMNode(this.refs.url),
          tagsInput = React.findDOMNode(this.refs.tags),
          url = urlInput.value.trim(),
          tags = tagsInput.value.trim();
      this.props.onSubmit({
        url: url,
        tags : tags
      });
      urlInput.value = '';
    }
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Bookmark</label>
        <input type="text" ref="url" />
        <input type="text" ref="tags" />
        <input type="submit" />
      </form>
    );
  }
});

module.exports = BookmarkForm;
