var actions = require('../constants/actions.js');
var dispatcher = require('../dispatcher/dispatcher.js');

var moviedbUtil = require('../utils/moviedb.util.js');

var moviesActions = {

    getMovies: function() {


        moviedbUtil.getMovies(function(movies){
            dispatcher.dispatch({
                type: actions.MOVIES_UPDATED,
                movies: movies
            });
        });

    }

};

module.exports = moviesActions;
