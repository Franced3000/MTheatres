const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Make a payment
router.post('/', (req, res) => {
    const { reservation_id, amount, payment_status } = req.body;
    db.query('INSERT INTO Payments (reservation_id, amount, payment_status) VALUES (?, ?, ?)', [reservation_id, amount, payment_status], (err, result) => {
        if (err) return res.status(500).send('Error making payment');
        res.status(200).send('Payment made');
    });
});

module.exports = router;
