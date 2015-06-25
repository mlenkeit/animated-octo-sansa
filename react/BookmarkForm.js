var React = require('react/addons');
var BookmarkForm = React.createClass({
  handleSubmit: function() {
    if (this.props.onSubmit) {
      var url = React.findDOMNode(this.refs.url).value.trim();
      this.props.onSubmit({
        url: url
      });
    }
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Bookmark</label>
        <input type="text" ref="url" />
        <input type="submit" />
      </form>
    );
  }
});

module.exports = BookmarkForm;
