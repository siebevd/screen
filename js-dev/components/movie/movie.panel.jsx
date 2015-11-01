var React = require("react");


var MoviePanel = React.createClass({

    render: function() {

        var movie = this.props.movie;

        console.log(movie);

        return (
            <div className="movie">

            </div>
        );
    }

});

module.exports = MoviePanel;
