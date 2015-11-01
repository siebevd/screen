var React = require("react");

var moviesActions = require('../actions/movies.actions.js');
var movieStore = require("../stores/movie.store.js");

var MoviePanel = require("./movie/movie.panel.jsx");

var App = React.createClass({
    getInitialState: function() {
        return {
            movie: movieStore.getRandomMovie()
        };
    },

    render: function() {
        var bgStyle = {},
            movie = this.state.movie;

        if (typeof movie === 'undefined') {
            return <div></div>;
        }


        bgStyle = {
            backgroundImage: 'url("' + movie.backdrop + '")'
        };

        // TODO: make screen for before a movie is loaded in
        return (
            <div>
                <div className="basic">
                    <div className="header">
                        <h1 className="header__title">Screens</h1>
                    </div>
                    <MoviePanel movie={movie}/>
                </div>
                <div className="bg" style={bgStyle}/>
            </div>
        );
    },

    componentWillMount: function() {

        moviesActions.getMovies();

    },
    // Listen for changes
    componentDidMount: function() {
        movieStore.addChangeListener(this.updateState);
    },

    // Unbind change listener
    componentWillUnmount: function() {
        movieStore.removeChangeListener(this.updateState);
    },

    updateState: function() {
        console.log('store has been updated');
        this.setState({movie: movieStore.getRandomMovie()});
    }


});

module.exports = App;
