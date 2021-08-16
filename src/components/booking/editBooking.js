import React , {Component} from 'react';
import Layout from '../layout/layout';
import '../../styles/createBooking.css';
import axios from 'axios';
class EditBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
          "date": "",
          "buildingId": "",
          "floorId": "",
          "desk": "",
          "bookingId": ""
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleBooking = this.handleBooking.bind(this);
        this.handleDesk = this.handleDesk.bind(this);
      }

    componentDidMount() {
        window.$("select").formSelect();
        console.log(this.props);
        console.log(this.props.match.params.bookingId);
    }

    handleChange(e) {
        this.setState({
          [e.target.id]: e.target.value,
        });
        const building = document.getElementById("building").value;
        const floor = document.getElementById("floor").value;
        const date = document.getElementById("date").value;
        this.setState({
          buildingId: building,
          floorId: floor,
          date: date,
          bookingId: this.props.match.params.bookingId
        });
      }

      handleDesk(e) {
        if (this.state.desk !== e)
        this.setState({desk: e})
        console.log("e ", e);
      }

      
      
      async handleBooking(e) {
        let data = {
          "userId": this.props.userId, 
              "floorId": this.state.floorId, 
              "buildingId": this.state.buildingId, 
              "date": this.state.date, 
              "location": this.state.desk,
              "bookingID": this.state.bookingId
        }
        console.log(data)
        e.preventDefault();
        await axios({
          method: 'put', 
          url: 'http://grads-coding-group-21.uc.r.appspot.com/updateBooking', 
          data: data
        })
        .then(res => {
          console.log(res);
        })
        this.props.history.push('/booking');
      }
    

    render() {
        return (
          <div className="createbooking-container">
            <div className="card">
                <div className="row booking-grid">
                    <div className="col booking-data">
                        <div className="row">
                            <label for="date">Choose Date</label>
                            <input id="date" type="date" value={this.props.match.params.date} onChange={this.handleChange} class="validate"/>
                        </div>
                        <div className="row">
                            <label>Choose Your Building</label>
                            <select id="building" onChange={this.handleChange} value={this.props.match.params.buildingId}>
                                    <option value="" disabled selected>
                                    Choose your option
                                    </option>
                                    <option value="1">Building 1</option>
                                    <option value="2">Building 2</option>
                                    <option value="3">Building 3</option>
                            </select>
                        </div>
                        <div className="row">
                        <label>Choose Your Floor</label>
                            <select id="floor" onChange={this.handleChange} value={this.props.match.params.floorId}>
                                    <option value="" disabled selected>
                                    Choose your option
                                    </option>
                                    <option value="1">Floor 1</option>
                                    <option value="2">Floor 2</option>
                                    <option value="3">Floor 3</option>
                                    <option value="4">Floor 4</option>
                            </select>
                        </div>
                        <div>{this.props.match.params.bookingID}</div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div>
                                <Layout {...this.state} userId = {this.props.userId} handleDesk = {this.handleDesk} location={this.props.match.params.location}/>
                            </div>
                        </div>
                        <button className="booking-btn" onClick={(e) => this.handleBooking(e)}>Submit</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default EditBooking