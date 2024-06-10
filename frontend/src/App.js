import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import MovieSearch from './components/MovieSearch';
import SeatSelection from './components/SeatSelection';

const App = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedTheater, setSelectedTheater] = useState(null); // Assuming you have a way to select a theater
    const [booking, setBooking] = useState(null);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/search" element={<MovieSearch setSelectedMovie={setSelectedMovie} />} />
                    <Route 
                        path="/select-seat" 
                        element={
                            selectedMovie && selectedTheater ? (
                                <SeatSelection
                                    movie={selectedMovie}
                                    theater={selectedTheater}
                                    user={{ id: 1 }} // Replace with actual user data from auth
                                    setBooking={setBooking}
                                />
                            ) : (
                                <div>Please select a movie and theater first.</div>
                            )
                        } 
                    />
                    <Route 
                        path="/" 
                        element={
                            <div>
                                <h1>Welcome to MTheatres</h1>
                                <h2>Your all-in-one platform to enjoy movies</h2>
                            </div>
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
