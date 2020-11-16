import React, { Component } from 'react';
import './stylesheet/App.sass';
import { Login } from './components/Login';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import { userContext } from './user-context';
import { Home } from './components/Home';
import { Register } from './components/Register';
import { LobbyRoom } from './components/LobbyRoom';
import { Game } from './components/Game';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import { UpdateProfile } from './components/UpdateProfile';
import { ChangePassword } from '../src/components/user/ChangePassword';

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
      <Router>
        <userContext.Provider value={this.state}>
          <section>
            <Route exact path='/' component={Login}/>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/registerPage' component={Register}/>
            <Route exact path='/change_nickname' component={UpdateProfile}/>
            <Route exact path='/change_password' component={ChangePassword}/>
            <Route exact path='/createRoom' component={CreateRoom}/>
            <Route exact path='/lobbyRoom/:room' render= {(props) => <LobbyRoom {...props}/>}/>
            <Route exact path='/gameRoom/:room' render= {(props) => <Game {...props}/>}/>
            <Route exact path='/joinRoom/:room' component={JoinRoom}/>
          </section>
        </userContext.Provider>
      </Router>
    );
  }
}
export default App;