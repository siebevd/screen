var React = require("react");


var MoviePanel = React.createClass({

    render: function() {

        var movie = this.props.movie,
            year = movie.release_date.split('-')[0],
            imdbLink = 'http://www.imdb.com/title/' + movie.imdb_id,
            description = movie.overview,
            genres = '';

        // TODO: decode &amp; charachters and stuff in the api

        // Testing out charachter length
        //description = "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Maecenas faucibus mollis interdum. Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Curabitur blandit tempus porttitor. Donec id elit non mi porta gravida at eget metus. Aenean lacinia bibendum nulla sed consectetur.Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor. Sed posuere consectetur est at lobortis.";
        //description = "Intrepid young reporter Tintin and his loyal dog Snowy are thrust into a world of high adventure when they discover a ship carrying an explosive secret. As Tintin is drawn into a centuries-old mystery, Ivan Ivanovitch Sakharine suspects him of stealing a priceless treasure. Tintin and Snowy, with the help of salty, cantankerous Captain Haddock, and bumbling detectives Thompson &amp; Thomson, ";

        // Limit the number of genres to 3 for now, so it doesnt break the design
        movie.genres = movie.genres.splice(0,3);

        genres = movie.genres.map(function(movie){
            return <span key={movie.id} className="movie__info__item">{movie.name}</span>;
        });

        if (description.length > 400) {
            description = description.substr(0,400);
            description += '...';
        }

        return (
            <div>
                <div className="movie-shadow" />
                <div className="movie">
                    <h2 className="movie__title">{movie.title}</h2>
                    <ul>
                        <li className="movie__info">{genres}</li>
                        <li className="movie__info">{year}</li>
                        <li className="movie__info">{movie.runtime} min</li>
                        <li className="movie__info">{movie.vote_average}/10</li>
                    </ul>

                    <div className="movie__description">{description}</div>
                    <a href={imdbLink} target="_blank" className="movie__link">view on IMDB</a>
                </div>
            </div>
        );
    }

});

module.exports = MoviePanel;
