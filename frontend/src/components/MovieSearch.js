import React, { useState } from 'react';
import axios from 'axios';

const MovieSearch = ({ setSelectedMovie }) => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/movies/search?query=${query}`);
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies', error);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Search for a movie" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id} onClick={() => setSelectedMovie(movie)}>
                        {movie.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieSearch;
