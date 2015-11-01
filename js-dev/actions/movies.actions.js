var actions = require('../constants/actions.js');
var dispatcher = require('../dispatcher/dispatcher.js');

var moviedbUtil = require('../utils/moviedb.util.js');

var moviesActions = {

    getMovies: function() {

        var self = this;


        moviedbUtil.getMovies(function(movies){

            dispatcher.dispatch({
                type: actions.MOVIES_UPDATED,
                movies: movies
            });

            self.getNextMovie(movies[0].id);

        });

    },

    getNextMovie: function(movieID) {
        // REVIEW: whats the best place to put this
        // get the first movie details
        moviedbUtil.getMovieDetails(movieID, function(movieDetails) {
            dispatcher.dispatch({
                type: actions.MOVIE_DETAILS_UPDATED,
                movie: movieDetails
            });
        });

    }

};

module.exports = moviesActions;
