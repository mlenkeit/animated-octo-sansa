var React = require('react/addons');
var BookmarkForm = React.createClass({
  render: function() {
    return (
      <form>
        <label>Bookmark</label>
        <input type="text" />
        <input type="submit" />
      </form>
    );
  }
});

module.exports = BookmarkForm;
