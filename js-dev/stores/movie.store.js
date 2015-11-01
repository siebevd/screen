var dispatcher = require('../dispatcher/dispatcher.js');
var actions = require('../constants/actions.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var _movies = [],
    _baseImgUrl = 'http://image.tmdb.org/t/p/'; // TODO: change this with /configuration api call


function _getRandomMovie() {
    // TODO: fix this upp
    return _movies[Math.floor(Math.random()*_movies.length)];
};

function handleMovieData(movies) {

    var handledMovies = [];

    for ( var i = 0, l = movies.length; i < l; i ++ ) {
        var movie = movies[i];

        movie.backdrop = _baseImgUrl + 'original' + movie.backdrop_path;
        movie.poster = _baseImgUrl + 'original' + movie.poster_path;

        handledMovies.push(movie);
    }

    return handledMovies;

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
        _movies = handleMovieData(payload.movies);

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

movieStore.getRandomMovie = function() {

    return _getRandomMovie();

};

module.exports = movieStore;
