import React, { useState } from 'react';
import axios from 'axios';
import MovieSearchResults from './MovieSearchResults';

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/movies/search?query=${query}`);
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    return (
        <div>
            <h1>Search for Movies</h1>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Enter movie title" 
            />
            <button onClick={handleSearch}>Search</button>
            <MovieSearchResults movies={movies} />
        </div>
    );
};

export default MovieSearch;
