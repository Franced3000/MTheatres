const express = require('express');
const { MovieDb } = require('moviedb-promise');
const dotenv = require('dotenv');
const { getStreamingDetails } = require('./streams');
const authMiddleware = require('../middleware/authMiddleware');

dotenv.config();

const router = express.Router();
const moviedb = new MovieDb(process.env.MOVIE_DB);

// Route to search for movies by title
router.get('/search', authMiddleware, async (req, res) => {
    const { query } = req.query;
    try {
        const response = await moviedb.searchMovie({ query });

        const movieDetailsWithStreaming = await Promise.all(response.results.map(async (movie) => {
            const imdbId = movie.imdb_id || movie.id; // Use IMDb ID if available, otherwise use movie ID
            const streamingDetails = await getStreamingDetails(imdbId);
            return {
                ...movie,
                streaming: streamingDetails,
            };
        }));

        res.status(200).json(movieDetailsWithStreaming);
    } catch (error) {
        console.error('Error searching movies:', error);
        res.status(500).json({ error: error.message });
    }
});

// Route to get movie details by ID
router.get('/details/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const response = await moviedb.movieInfo({ id });

        const imdbId = response.imdb_id || id; // Use IMDb ID if available, otherwise use movie ID
        const streamingDetails = await getStreamingDetails(imdbId);

        const movieWithStreaming = {
            ...response,
            streaming: streamingDetails,
        };

        res.status(200).json(movieWithStreaming);
    } catch (error) {
        console.error('Error getting movie details:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

