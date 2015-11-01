var React = require("react");


var MoviePanel = React.createClass({

    render: function() {

        var movie = this.props.movie,
            year = movie.release_date.split('-')[0],
            imdbLink = 'http://www.imdb.com/title/' + movie.imdb_id,
            genres = '';


        genres = movie.genres.map(function(movie){
            return <span key={movie.id} className="movie__genre__item">{movie.name}</span>;
        });

        return (
            <div>
                <div className="movie-shadow" />
                <div className="movie">
                    <h2 className="movie__title">{movie.title}</h2>
                    <ul>
                        <li>{genres}</li>
                        <li>{year}</li>
                        <li>{movie.runtime} min</li>
                        <li>{movie.vote_average}</li>
                    </ul>

                    <div className="movie__description">{movie.overview}</div>
                    <a href={imdbLink} target="_blank" className="movie__link">Details on IMDB</a>
                </div>
            </div>
        );
    }

});

module.exports = MoviePanel;
