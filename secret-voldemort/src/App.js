import React, { Component } from 'react';
import { Login } from './components/Login';
import { BrowserRouter, Route } from 'react-router-dom';
import { userContext } from './user-context';
import { Home } from './components/Home';
import { Register } from './components/Register';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import Cookies from 'js-cookie';


// This is the "main".
// We use rout for organization of our single page app.
class App extends Component {

  static contextType = userContext

  setToken = token => {
     this.setState({token});
  }

  setUsername = username => {
    this.setState({username});
  }
  
  setEmail =  email => {
    this.setState({email});
  }

  setIcon = icon => {
    this.setState({icon});
  }


  readCookie = () => {
    console.log(this.context.username)
    let cookie = Cookies.get(this.context.username)
    if (cookie === this.context.token) {
      return true
    } else {
      return false
    }
  }

  state = {
    token: '',
    username: '',
    email: '',
    icon: {},
    setToken: this.setToken,
    setUsername: this.setUsername,
    setEmail: this.setEmail,
    setIcon: this.setIcon
  };

  render() { 
    const cookieIsSet = Object.values(Cookies.get()).length
    console.log("Cookies" + Object.values(Cookies.get()))
    let HomePage = Login
    // this it the previous guard (cookie.name !== undefined)
    if (cookieIsSet !== 0) {
      HomePage = Home
    }
    return (
      <BrowserRouter>
        <userContext.Provider value={this.state}>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/registerPage' component={Register}/>
          <Route exact path='/createRoom' component={CreateRoom}/>
          <Route exact path='/joinRoom/:room' component={JoinRoom}/>
        </userContext.Provider>
      </BrowserRouter>
    );
  }
}
export default App;



