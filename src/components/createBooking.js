import React , {Component} from 'react';
import Layout from './layout';
// import axios from 'axios';
import '../styles/createBooking.css';
import axios from 'axios';
class CreateBooking extends Component {
    constructor() {
        super();
        this.state = {
          "date": "",
          "buildingId": "",
          "floorId": "",
          "desk": ""
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleBooking = this.handleBooking.bind(this);
        this.handleDesk = this.handleDesk.bind(this);
      }

    componentDidMount() {
        window.$("select").formSelect();
        console.log(this.props);
        // axios.get(`http://localhost:8080/user/${this.props.email}`)
        // .then(response => {
        //     console.log(response)
        //     const user = response.data
          
        //     this.setState ({
        //         ...this.state,
        //         details: user
        //     });
        //     console.log(this.state.details)
        // });
    }

    handleChange(e) {
        this.setState({
          [e.target.id]: e.target.value,
        });
        const building = document.getElementById("building").value;
          // document.getElementById("building").options[
          //   document.getElementById("building").selectedIndex
          // ].text;
        const floor = document.getElementById("floor").value;
          // document.getElementById("floor").options[
          //   document.getElementById("floor").selectedIndex
          // ].text;
        const date = document.getElementById("date").value;
        this.setState({
          buildingId: building,
          floorId: floor,
          date: date
        });
      }

      handleDesk(e) {
        if (this.state.desk !== e)
        this.setState({desk: e})
        // console.log("e ", e);
      }

      handleBooking(e) {
        e.preventDefault();
        axios({
          method: 'post', 
          url: 'http://localhost:8080/addNewBooking', 
          data: {
            "userId": this.props.userId, 
            "floorId": this.state.floorId, 
            "buildingId": this.state.buildingId, 
            "date": this.state.date, 
            "location": this.state.desk
          }
        })
        .then(res => {
          console.log(res);
        })
        this.props.history.push('/booking');
      }
    

    render() {
        return (
            <div className="card createbooking-container">
                <div className="row booking-grid">
                    <div className="col booking-data">
                        <div className="row">
                            <label for="date">Choose Date</label>
                            <input id="date" type="date" onChange={this.handleChange} class="validate"/>
                        </div>
                        <div className="row">
                            <label>Choose Your Building</label>
                            <select id="building" onChange={this.handleChange}>
                                    <option value="" disabled selected>
                                    Choose your option
                                    </option>
                                    <option value="1">Building 1</option>
                                    <option value="2">Building 2</option>
                            </select>
                        </div>
                        <div className="row">
                        <label>Choose Your Floor</label>
                            <select id="floor" onChange={this.handleChange}>
                                    <option value="" disabled selected>
                                    Choose your option
                                    </option>
                                    <option value="1">Floor 1</option>
                                    <option value="2">Floor 2</option>
                                    <option value="3">Floor 3</option>
                                    <option value="4">Floor 4</option>
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div>
                                <Layout {...this.state} userId = {this.props.userId} handleDesk = {this.handleDesk}/>
                            </div>
                        </div>
                        <button className="booking-btn" onClick={(e) => this.handleBooking(e)}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateBooking