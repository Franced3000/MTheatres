const express = require('express');
const { MovieDb } = require('moviedb-promise');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();
const moviedb = new MovieDb(process.env.MOVIE_DB);

// Route to search for movies by title
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const response = await moviedb.searchMovie({ query });
        res.status(200).json(response.results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get movie details by ID
router.get('/details/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await moviedb.movieInfo({ id });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;