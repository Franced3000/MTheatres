import React, { useState } from 'react';
import axios from 'axios';

const SeatSelection = ({ movie, theater, user, setBooking }) => {
    const [seat, setSeat] = useState('');

    const handleBooking = async () => {
        try {
            const reservationResponse = await axios.post('/reservations', {
                user_id: user.id,
                movie_id: movie.id,
                theater_id: theater.id,
                seat_number: seat
            });
            const paymentResponse = await axios.post('/payments', {
                reservation_id: reservationResponse.data.reservation_id,
                amount: movie.price,
                payment_status: 'completed'
            });
            setBooking(paymentResponse.data);
        } catch (error) {
            console.error('Error booking seat', error);
        }
    };

    return (
        <div>
            <h2>Select a seat</h2>
            <input type="text" placeholder="Seat number" value={seat} onChange={(e) => setSeat(e.target.value)} />
            <button onClick={handleBooking}>Book</button>
        </div>
    );
};

export default SeatSelection;
