var request = require('superagent');

var config = require('../config.js');

var moviedb = {};



moviedb.getMovies = function(callback) {

    var endYear = Math.floor(Math.random() * (new Date().getFullYear() + 1 - 2010)) + 2010,
        startYear = endYear - 25,
        pageNr = Math.floor(Math.random() * 30 ) + 1;

    console.log('getting new movies between:' + startYear + '-' + endYear + ', pagenr:' + pageNr);

    request.get(config.mdbApiUrl + 'discover/movie?sort_by=vote_count.desc&language=en&page=' + pageNr + '&release_date.gte=' + startYear + '-01-01&release_date.lte='+endYear+'-01-01&api_key='+config.mdbApiKey)
           .end(function(err, res) {
               console.log(err);
              // console.log(res.body.results);

              if (err) {
                // TODO: deal with Error
                console.log('Error: ' + err);
                return;
              }
              callback(res.body.results);
           });

}

moviedb.getMovieDetails = function(movieID, callback) {
    request.get(config.mdbApiUrl + 'movie/' + movieID + '?api_key='+config.mdbApiKey)
           .end(function(err, res) {
              // console.log(res.body.results);

              if (err) {
                // TODO: deal with Error
                console.log('Error: ' + err);
                return;
              }

              //console.log(res.body);
              callback(res.body);
           });
}


module.exports = moviedb;
