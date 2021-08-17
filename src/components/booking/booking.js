import React, { Component } from 'react';
import axios from 'axios';
import Header from '../header/header';
import '../../styles/booking.css';

class Booking extends Component {
    state = {
        details: {}
        }
    componentDidMount() {
        axios.get(`http://grads-coding-group-21.uc.r.appspot.com/user/${this.props.email}`)
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
        const customEvent = new CustomEvent('createBooking', {detail: this.state.details.userID} );
        document.dispatchEvent(customEvent);
        this.props.history.push('createBooking');
    }

    handleEditBooking(booking) {
        const customEvent = new CustomEvent('editBooking', {detail: this.state.details.userID} );
        document.dispatchEvent(customEvent);
        console.log(booking)
        this.props.history.push(`editbooking/${booking.bookingID}/${booking.floorId}/${booking.buildingId}/${booking.bDate}/${booking.location}`)
    }

    handleDeleteBooking(bookingId) {
        axios({
          method: 'delete', 
          url: `http://grads-coding-group-21.uc.r.appspot.com/deleteBooking/${bookingId}`
        })
        .then(res => {
          console.log(res);
        })
        this.props.history.push('/booking');
    }

    render() {
        return (
            <div className="booking-container">
                <div>
                    <Header username={this.state.details.name}/>
                </div>
                <button className = "create-btn" onClick = {(e) => this.handleCreateBooking(e)}>Create New Booking</button>
                <div className="row">
                {this.state.details.bookings ? this.state.details.bookings.map(currbooking => {           
                    return(
                    <div className="col">
                        <div className="card booking-card">
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
                            <button className="edit-btn" onClick = {(e) => this.handleEditBooking(currbooking)}>Edit</button>
                            <button className="delete-btn" onClick = {(e) => this.handleDeleteBooking(currbooking.bookingID)}>Delete</button>
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
