var dispatcher = require('../dispatcher/dispatcher.js');
var actions = require('../constants/actions.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var _movies = [],
    _baseImgUrl = 'http://image.tmdb.org/t/p/',
    _shownMovies = 0,
    _shownMoviesTotal = [],
    _currentMovie = null; // TODO: change this with /configuration api call


function _getRandomMovieID() {
    // TODO: add in id in array and check if we have already seen the movie or not?

    var movieID = _movies[Math.floor(Math.random()*_movies.length)].id;

    if (_shownMoviesTotal.indexOf(movieID) !== -1) {
        // TODO: pick another movie number
        removeMovie(movieID);
        // This is just a quick dirty hack. Doesn't ensure the issue won't come up again
        // But makes changes smaller for now
        movieID = _movies[Math.floor(Math.random()*_movies.length)].id;
    }


    _shownMoviesTotal.push(movieID);

    return movieID;
};

function removeMovie(movieID) {

    for (var i = 0, l = _movies.length; i < l; i ++ ) {

        if (_movies[i].id === movieID) {
            _movies.splice(i, 1);
            break;
        }
    }

}

function handleMovieData(movie) {

    movie.backdrop = _baseImgUrl + 'original' + movie.backdrop_path;
    movie.poster = _baseImgUrl + 'original' + movie.poster_path;

    return movie;

}


// Merge our store with Node's Event Emitter
var movieStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register dispatcher callback
movieStore.dispatcherIndex = dispatcher.register(function(payload) {


  switch(payload.type) {
    case actions.MOVIES_UPDATED:

        _movies = payload.movies;
        _shownMovies = 0;

        movieStore.emitChange();
        break;

    case actions.MOVIE_DETAILS_UPDATED:

        _currentMovie = handleMovieData(payload.movie);
        _shownMovies ++;

        movieStore.emitChange();
        break;
    default:
      return true;
  }

  // If action was acted upon, emit change event

  return true;

});

/* Getters
---------------------*/

movieStore.getRandomMovieID = function() {

    return _getRandomMovieID();

};

movieStore.getShownMovies = function() {

    return _shownMovies;

};

movieStore.getCurrentMovie = function() {


    return _currentMovie;

}

module.exports = movieStore;
