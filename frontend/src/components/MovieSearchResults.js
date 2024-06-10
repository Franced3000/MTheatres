import React from 'react';

const MovieSearchResults = ({ movies }) => {
    return (
        <div>
            <h2>Search Results</h2>
            <div className="movies-list">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <h3>{movie.title}</h3>
                        <p>{movie.overview}</p>
                        <p>Release Date: {movie.release_date}</p>
                        {movie.streaming && (
                            <div className="streaming-details">
                                <h4>Streaming Available On:</h4>
                                <ul>
                                    {movie.streaming.streaming_services.map(service => (
                                        <li key={service.platform}>{service.platform}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieSearchResults;
