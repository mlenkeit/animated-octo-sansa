var React = require('react/addons');
var BookmarkForm = React.createClass({
  handleSubmit: function() {
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Bookmark</label>
        <input type="text" />
        <input type="submit" />
      </form>
    );
  }
});

module.exports = BookmarkForm;
