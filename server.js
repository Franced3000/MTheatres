const express = require('express');
require('dotenv').config();
const db = require('./config/db');


const app = express();
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const reservationRoutes = require('./routes/reservations');
const paymentRoutes = require('./routes/payments');
const movieRoutes = require('./routes/movies');

// Use routes
app.use('/auth', authRoutes);
app.use('/reservations', reservationRoutes);
app.use('/payments', paymentRoutes);
app.use('/movies', movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
