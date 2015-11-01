var React = require("react");
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var moviesActions = require('../actions/movies.actions.js');
var movieStore = require("../stores/movie.store.js");

var MoviePanel = require("./movie/movie.panel.jsx");

var App = React.createClass({
    getInitialState: function() {
        return {
            movie: movieStore.getCurrentMovie(),
            shownMovies: movieStore.getShownMovies()
        };
    },

    render: function() {
        var bgStyle = {},
            movie = this.state.movie;

        if (movie === null) {
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
                    <div className="switch">
                        <button className="switch__btn" onClick={this.nextMovie}>Nah, give me something else</button>
                        <div className="switch__shadow"></div>
                    </div>
                </div>
                <ReactCSSTransitionGroup transitionName="bg" transitionEnterTimeout={500} transitionLeaveTimeout={500} >
                    <div className="bg" key={'bg-'+movie.id} style={bgStyle}/>
                </ReactCSSTransitionGroup>
            </div>
        );
    },

    /* Lifecycle
    ------------------------*/

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

    /* Interactions
    ------------------------*/

    nextMovie: function(ev) {
        // refresh the movies after 5 movies to keep things fresh
        if (this.state.shownMovies >= 5) {
            moviesActions.getMovies();
            return;
        }
        moviesActions.getNextMovie(movieStore.getRandomMovieID());
    },


    /* Data Handlers
    ------------------------*/

    updateState: function() {

        this.setState({
            movie: movieStore.getCurrentMovie(),
            shownMovies: movieStore.getShownMovies()
        });
    }


});

module.exports = App;
