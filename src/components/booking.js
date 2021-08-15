import React, { Component } from 'react';
import axios from 'axios';

class Booking extends Component {
    state = {
        details: {}
        }
    componentDidMount() {
        axios.get(`http://localhost:8080/user/${this.props.email}`)
        .then(response => {
            console.log(response)
            const user = response.data
          
            this.setState ({
                ...this.state,
                details: user
            });
            console.log(this.state.details)
        });
        
    }

    render() {
        return (
            <div className="booking-container">
                <div className="row">
                {this.state.details.currentBooking ? this.state.details.currentBooking.map(bookings => {           
                    return(
                    <div className="col">
                        <div className="card">
                            {bookings.date}
                            <br/>
                            {bookings.bookingId}
                            <br/>
                            {bookings.buildingId}
                            <br/>
                            {bookings.floorId}
                            <br/>
                            {bookings.location}
                            <br/>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                    );
                }) : ""}
                </div>
            </div>      
        );
    }
}
export default Booking
