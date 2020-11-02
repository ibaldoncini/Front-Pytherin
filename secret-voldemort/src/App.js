import React, { Component } from 'react';
import './App.sass';
import { Login } from './components/Login';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import { userContext } from './user-context';
import { Home } from './components/Home';
import { Register } from './components/Register';
import { LobbyRoom } from './components/LobbyRoom';
import { Game } from './components/Game';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';

// This is the "main".
// We use rout for organization of our single page app.
class App extends Component {
  constructor(props) {
    super(props);
  }

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
    return (
      <BrowserRouter>
        <userContext.Provider value={this.state}>
          <Route exact path='/' component={Login}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/registerPage' component={Register}/>
          <Route exact path='/createRoom' component={CreateRoom}/>
          <Route exact path='/lobbyRoom' render= {(props) => <LobbyRoom {...props}/>}/>
          <Route exact path='/gameRoom' render= {(props) => <Game {...props}/>}/>
          <Route exact path='/joinRoom/:room' component={JoinRoom}/>
        </userContext.Provider>
      </BrowserRouter>
    );
  }
}
export default App;