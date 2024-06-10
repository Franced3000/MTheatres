const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Make a reservation
router.post('/', (req, res) => {
    const { user_id, movie_id, theater_id, seat_number } = req.body;
    db.query('INSERT INTO Reservations (user_id, movie_id, theater_id, seat_number) VALUES (?, ?, ?, ?)', [user_id, movie_id, theater_id, seat_number], (err, result) => {
        if (err) return res.status(500).send('Error making reservation');
        res.status(200).send('Reservation made');
    });
});

module.exports = router;
