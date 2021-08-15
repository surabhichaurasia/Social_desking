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
        axios.get('https://mocki.io/v1/0415a38c-287b-469d-8734-d1541c49a7a2')
        .then(res => {
            const data = res.data;
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
        })
        
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
                    k = i + '_' + j;
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
