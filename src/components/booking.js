import React, { Component } from 'react';
import axios from 'axios';

class Booking extends Component {
    state = {
        details: {}
        }
    componentDidMount() {
        console.log(this.props)
        axios.get(`http://mocki.io/v1/cea45500-c034-4734-b984-a7ce57d748b9`)
        .then(response => {
        const user = response.data;
        this.setState ({
            details: user
        });
        console.log(this.state.details)
        })
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
