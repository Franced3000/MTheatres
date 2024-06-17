const express = require('express');
require('dotenv').config();
const db = require('./config/db');
const verifyToken = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const reservationRoutes = require('./routes/reserv');
const paymentRoutes = require('./routes/paymts');
const movieRoutes = require('./routes/movies');

// Use routes
app.use('/auth', authRoutes); // Raccogli tutte le rotte di autenticazione in un unico prefisso

// Use verifyToken middleware for protected routes
app.use('/reservations', verifyToken, reservationRoutes);
app.use('/payments', verifyToken, paymentRoutes);
app.use('/movies', verifyToken, movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

