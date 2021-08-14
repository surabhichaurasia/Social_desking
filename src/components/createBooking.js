import React , {Component} from 'react';

class CreateBooking extends Component {
    constructor() {
        super();
        this.state = {
          "date": "",
          "building": "",
          "floor": "",
          "desk": ""
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleBooking = this.handleBooking.bind(this);
      }

    componentDidMount() {
        window.$("select").formSelect();
    }

    handleChange(e) {
        this.setState({
          [e.target.id]: e.target.value,
        });
        const building =
          document.getElementById("building").options[
            document.getElementById("building").selectedIndex
          ].text;
        const floor =
          document.getElementById("floor").options[
            document.getElementById("floor").selectedIndex
          ].text;
        this.setState({
          building: building,
          floor: floor,
        });
      }

      handleBooking() {

      }
    

    render() {
        return (
            <div className="card">
                <div className="row">
                    <div className="col">
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
                                    <option value="b1">Building 1</option>
                                    <option value="b2">Building 2</option>
                            </select>
                        </div>
                        <div className="row">
                        <label>Choose Your Floor</label>
                            <select id="floor" onChange={this.handleChange}>
                                    <option value="" disabled selected>
                                    Choose your option
                                    </option>
                                    <option value="f1">Floor 1</option>
                                    <option value="f2">Floor 2</option>
                                    <option value="f3">Floor 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="card booking-layout-card">
                                Layout
                            </div>
                        </div>
                        <button onClick={(e) => this.handleBooking(e)}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateBooking