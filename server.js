const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'movie_reservation'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Authentication routes
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    db.query('INSERT INTO Users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).send('Error registering user');
        res.status(200).send('User registered');
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).send('Error on the server');
        if (!results.length) return res.status(404).send('No user found');
        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        const token = jwt.sign({ id: user.user_id }, 'secret', { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
    });
});

// Reservation and Payment routes
app.post('/reservations', (req, res) => {
    const { user_id, movie_id, theater_id, seat_number } = req.body;
    db.query('INSERT INTO Reservations (user_id, movie_id, theater_id, seat_number) VALUES (?, ?, ?, ?)', [user_id, movie_id, theater_id, seat_number], (err, result) => {
        if (err) return res.status(500).send('Error making reservation');
        res.status(200).send('Reservation made');
    });
});

app.post('/payments', (req, res) => {
    const { reservation_id, amount, payment_status } = req.body;
    db.query('INSERT INTO Payments (reservation_id, amount, payment_status) VALUES (?, ?, ?)', [reservation_id, amount, payment_status], (err, result) => {
        if (err) return res.status(500).send('Error making payment');
        res.status(200).send('Payment made');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
