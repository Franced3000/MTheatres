import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import MovieSearch from './components/MovieSearch';
import Register from './components/Register';
import MovieDetails from './components/MovieDetails';

const App = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [authToken, setAuthToken] = useState('');

    return (
        <Router>
            <div className="app-container">
                <header className="app-header">
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/search">Search Movies</Link></li>
                        </ul>
                    </nav>
                </header>

                <main className="main-content">
                    <Routes>
                        <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/search" element={<MovieSearch setSelectedMovie={setSelectedMovie} authToken={authToken} />} />
                        <Route path="/details/:id" element={<MovieDetails movie={selectedMovie} />} />
                        <Route path="/" element={<div>Welcome to MTheatres</div>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;

