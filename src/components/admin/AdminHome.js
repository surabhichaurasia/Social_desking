import { Component } from "react";
// import { Button, Container } from "reactstrap";
import axios from 'axios';
import Header from '../header/header';
import '../../styles/admin.css';

class AdminHome extends Component{
    constructor() {
        super();
        this.onClick1 = this.onClick1.bind(this);
        this.onClick2 = this.onClick2.bind(this);
        this.onClick3 = this.onClick3.bind(this);
        this.state = {
            arr: [
                { floorid:1, name: "Floor 1", isActive: 1 },
                { floorid:2, name: "Floor 2", isActive: 1 },
                { floorid:3, name: "Floor 3", isActive: 1 },
                { floorid:4, name: "Floor 4", isActive: 1 }
            ],
            arr2: [
                { floorid:1, name: "Floor 1", isActive: 1 },
                { floorid:2, name: "Floor 2", isActive: 1 },
                { floorid:3, name: "Floor 3", isActive: 1 },
                { floorid:4, name: "Floor 4", isActive: 1 }
            ],
            arr3: [
                { floorid:1, name: "Floor 1", isActive: 1 },
                { floorid:2, name: "Floor 2", isActive: 1 },
                { floorid:3, name: "Floor 3", isActive: 1 },
                { floorid:4, name: "Floor 4", isActive: 1 }
            ]
        };
    }
    componentDidMount() {
      let data = [];
      axios.get('http://grads-coding-group-21.uc.r.appspot.com/getAdminData')
      .then(res => {
        // console.log(res);
        data = res.data;
        let temp1 = this.state.arr;
        let temp2 = this.state.arr2;
        let temp3 = this.state.arr3;
        for (let i=0;i<4;i++)
        temp1[i].isActive = data[i].available;
        for (let i=0;i<4;i++)
        temp2[i].isActive = data[i+4].available;
        for (let i=0;i<4;i++)
        temp3[i].isActive = data[i+8].available;
        this.setState({
          arr: temp1, 
          arr2: temp2, 
          arr3: temp3
        })
      })
    }
    colorHandler(active) {
      return active ? 'lightgreen' : 'red';
    }
    onClick1(index) {
        let tmp = this.state.arr;
        tmp[index].isActive = tmp[index].isActive ? 0 : 1;
        this.setState({ arr: tmp });
        axios({
            method: "put",
            // url: "http://grads-coding-group-21.uc.r.appspot.com/updateFloorAvailability",
            url: "http://grads-coding-group-21.uc.r.appspot.com/updateFloorAvailability",
            params: {
              "userId":1234,
              "floorId": this.state.arr[index].floorid,
              "buildingId": 1,
              "availability": this.state.arr[index].isActive
            },
          }).then((res) => {
            console.log(res);
          });
    }
    onClick2(index) {
        let tmp = this.state.arr2;
        tmp[index].isActive = tmp[index].isActive ? 0 : 1;
        this.setState({ arr2: tmp });
        axios({
            method: "put",
            // url: "http://grads-coding-group-21.uc.r.appspot.com/updateFloorAvailability",
            url: "http://grads-coding-group-21.uc.r.appspot.com/updateFloorAvailability",
            params: {
              "userId":1234,
              "floorId": this.state.arr2[index].floorid,
              "buildingId": 2,
              "availability": this.state.arr2[index].isActive
            },
          }).then((res) => {
            console.log(res);
          });
    }
    onClick3(index) {
        let tmp = this.state.arr3;
        tmp[index].isActive = tmp[index].isActive ? 0 : 1;
        this.setState({ arr3: tmp });
        axios({
            method: "put",
            // url: "http://grads-coding-group-21.uc.r.appspot.com/updateFloorAvailability",
            url: "http://grads-coding-group-21.uc.r.appspot.com/updateFloorAvailability",
            params: {
              "userId":1234,
              "floorId": this.state.arr3[index].floorid,
              "buildingId": 3,
              "availability": this.state.arr3[index].isActive
            },
          }).then((res) => {
            console.log(res);
          });
    }
    render() {
        return (
            <div class="Container">
     <div><Header username="Admin"/></div>
 <div class="row">
     <div class="col">
  <div className="card admin-card">
         <h3>Building 1</h3>
            <div>
                {this.state.arr.map((el, index) =>
                    <button style = {{background : this.colorHandler(el.isActive)}} className = 'admin-button' key={index} onClick={() => this.onClick1(index)}>
                       {el.name}  {el.isActive ? "Enabled" : "Disabled"}
                    </button>
                     
                )}<br/>
            </div>
            </div>
            </div>

            <div class="col">
            <div className="card admin-card">
                 <h3>Building 2</h3>
            <div>
                {this.state.arr2.map((el, index) =>
                    <button style = {{background : this.colorHandler(el.isActive)}} className = 'admin-button' key={index} onClick={() => this.onClick2(index)}>
                       {el.name}  {el.isActive ? "Enabled" : "Disabled"}
                    </button>
                     
                )}<br/>
            </div>
            </div>
            </div>

            <div class="col">
            <div className="card admin-card">

                 <h3>Building 3</h3>
            <div>
                {this.state.arr3.map((el, index) =>
                    <button style = {{background : this.colorHandler(el.isActive)}} className = 'admin-button' key={index} onClick={() => this.onClick3(index)}>
                       {el.name}  {el.isActive ? "Enabled" : "Disabled"}
                    </button>
                     
                )
    }
            </div>
            </div>
            </div>
            </div>
            </div>
            );
        }
    }
    
export default AdminHome
