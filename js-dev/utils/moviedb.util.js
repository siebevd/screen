var request = require('superagent');

var config = require('../config.js');

var moviedb = {};



moviedb.getMovies = function(callback) {

    var randomYear = Math.floor(Math.random() * (new Date().getFullYear() + 1 - 1990)) + 1990,
        pageNr = Math.floor(Math.random() * 30 ) + 1;

    request.get(config.mdbApiUrl + 'discover/movie?sort_by=vote_count.desc&language=en&page='+pageNr+'&release_date.lte='+randomYear+'-01-01&api_key='+config.mdbApiKey)
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


module.exports = moviedb;
