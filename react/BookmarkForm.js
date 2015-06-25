var React = require('react/addons');
var BookmarkForm = React.createClass({
  handleSubmit: function() {
    if (this.props.onSubmit) {
      var urlInput = React.findDOMNode(this.refs.url),
          url = urlInput.value.trim();
      this.props.onSubmit({
        url: url
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
