var React = require("react");

var App = React.createClass({
  getInitialState: function() {
    return {};
  },
  
  render: function() {
    return (
        <div className="basic">
          <MainContent />
        </div>
    );
  }
});

module.exports = App;
