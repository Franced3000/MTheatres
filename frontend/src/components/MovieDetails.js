import React from 'react';

const MovieDetails = ({ movie }) => {
    return (
        <div>
            <h2>{movie.title}</h2>
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
    );
};

export default MovieDetails;
