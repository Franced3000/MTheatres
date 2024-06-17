const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assicurati di importare il modello User

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Errore durante la registrazione' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send({ message: 'Utente non trovato' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log('Password non corretta');
            return res.status(401).send({ message: 'Password non corretta' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ accessToken: token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Errore durante il login' });
    }
});

module.exports = router;
