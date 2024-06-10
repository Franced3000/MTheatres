import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/search">
                        <MovieSearch setSelectedMovie={setSelectedMovie} />
                    </Route>
                    <Route path="/select-seat">
                        {selectedMovie && selectedTheater && (
                            <SeatSelection
                                movie={selectedMovie}
                                theater={selectedTheater}
                                user={{ id: 1 }} // Replace with actual user data from auth
                                setBooking={setBooking}
                            />
                        )}
                    </Route>
                    <Route path="/">
                        <h1>Welcome to MTheatres</h1>
                        <h2>your only in one platform for enjoy your movies</h2>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
