import React, { Component } from 'react';
import axios from 'axios';
import Header from '../header/header';

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

    handleCreateBooking(e) {
        // console.log(e);
        // console.log(this);
        const customEvent = new CustomEvent('createBooking', {detail: this.state.details.userID} );
        document.dispatchEvent(customEvent);
        this.props.history.push('createBooking');
    }

    render() {
        return (
            <div className="booking-container">
                <div>
                    <Header />
                </div>
                <button className = "local-btn" onClick = {(e) => this.handleCreateBooking(e)}>Create New Booking</button>
                <div className="row">
                {this.state.details.bookings ? this.state.details.bookings.map(currbooking => {           
                    return(
                    <div className="col">
                        <div className="card">
                            Date: {currbooking.bDate}
                            <br/>
                            Booking ID: {currbooking.bookingID}
                            <br/>
                            Building ID: {currbooking.buildingId}
                            <br/>
                            Floor ID: {currbooking.floorId}
                            <br/>
                            Location: {currbooking.location}
                            <br/>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                    );
                }) : "No current bookings"}
                </div>
            </div>      
        );
    }
}
export default Booking
