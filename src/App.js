import React , {Component} from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import './App.css';
import Login from './components/login'
import Booking from './components/booking'
import CreateBooking from './components/createBooking'

let email = ""
let userId = ""
class App extends Component {
  
  render() {
    document.addEventListener('login', function(data) {
      // this.setState({
      //   email: data.detail
      // })
      console.log(data.detail)
      email = data.detail
    })

    document.addEventListener('createBooking', function(data) {
      console.log(data.detail)
      userId = data.detail
    })

  return (
    <BrowserRouter>
     <Switch>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/createbooking' render = {
          (props) => (
            <CreateBooking {...props} userId = {userId}/>)}
        />
        <Route path='/booking' render={
          (props) => (
            <Booking {...props} email={email} />)}
        />

      </Switch>
   </BrowserRouter>
  );
}
}

export default App;
