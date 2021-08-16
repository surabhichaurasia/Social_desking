import React, { Component } from 'react'
import axios from 'axios'
import '../styles/layout.css'

export class Layout extends Component {
    state = {
        data: {},
        mat: [],
        active: null
    }
    componentDidMount() {
        axios.get('http://localhost:8080/getCurrentFloorBooking', {
            params: {
                userId: this.props.userId, 
                floorId: 1, 
                buildingId: 1, 
                date: new Date().toISOString().slice(0, 10)
            }
        })
        .then(res => {
            const data = res.data;
            console.log(data);
            if (data.layoutMatrix.localeCompare(this.state.data.layoutMatrix)) {
                this.setState({data});
                let temp = [], temp_mat = [];
                for (let i = 0 ; i < data.layoutMatrix.length ; i++) {
                    if (data.layoutMatrix[i] === '(') {
                        temp_mat.push(temp);
                        temp = [];
                    }
                    else if (data.layoutMatrix[i] === '1')
                    temp.push(1);
                    else if (data.layoutMatrix[i] === '2')
                    temp.push(2);
                    else if (data.layoutMatrix[i] === '0')
                    temp.push(0);
                }
                this.setState({mat: temp_mat});
            }
        })
        console.log(this.props);
    }

    componentDidUpdate() {
        axios.get('http://localhost:8080/getCurrentFloorBooking', {
            params: {
                userId: this.props.userId, 
                floorId: this.props.floorId, 
                buildingId: this.props.buildingId, 
                date: this.props.date
            }
        })
        .then(res => {
            const data = res.data;
            console.log(data);
            if (data.layoutMatrix.localeCompare(this.state.data.layoutMatrix)) {
                this.setState({data});
                let temp = [], temp_mat = [];
                for (let i = 0 ; i < data.layoutMatrix.length ; i++) {
                    if (data.layoutMatrix[i] === '(') {
                        temp_mat.push(temp);
                        temp = [];
                    }
                    else if (data.layoutMatrix[i] === '1')
                    temp.push(1);
                    else if (data.layoutMatrix[i] === '2')
                    temp.push(2);
                    else if (data.layoutMatrix[i] === '0')
                    temp.push(0);
                }
                this.setState({mat: temp_mat});
            }
        })
        console.log(this.state.active);
        this.props.handleDesk(this.state.active);
    }
    content(mat) {
        let con = []
        let temp = []
        let k = '';
        if (mat) {
            for (let i = 0 ; i < mat.length ; i++)
            {
                temp = []
                for (let j = 0 ; j < mat[i].length ; j++)
                {
                    k = (i-1) + ',' + j;
                    if (mat[i][j] === 1)
                    temp.push(<span style = {{background: this.myColor(k)}} onClick = {this.Event.bind(this)} key = {k} id = {k}></span>)
                    else if (mat[i][j] === 2)
                    temp.push(<span style = {{background: "lightblue"}} key = {k} id = {k}></span>)
                    else
                    temp.push(<span style = {{background: "grey"}} key = {k} id = {k}></span>)
                }
                k = 'row_' + i;
                con.push(<p key = {k}>{temp}</p>)
            }
        }
        return con;
    }

    myColor(pos) {
        if (this.state.active === pos)
        return "lightgreen";
        else
        return "";
    }

    Event(event) {
        let id = event.target.attributes.id.value;
        if (this.state.active === id)
        this.setState({active: null});
        else
        this.setState({active: id});
    }

    render() {
        return (
            <div>
                {
                    this.content(this.state.mat)
                }
            </div>
        )
    }
}

export default Layout
