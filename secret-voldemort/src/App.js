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
import { Vote } from './components/Vote';

// This is the "main".
// We use rout for organization of our single page app.
// care with this, it was functional... but it wasn't working
  class App extends Component {

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
            <Route exact path='/' render= {() => <Login/>}/>
            <Route exact path='/home' render= {() => <Home/>}/>
            <Route exact path='/registerPage' render= {() => <Register/>}/>
            <Route exact path='/lobbyRoom' render= {(props) => <LobbyRoom {...props}/>}/>
            <Route exact path='/gameRoom' render= {(props) => <Game {...props}/>}/>
            <Route exact path='/createRoom' render= {() => <CreateRoom/>}/>
            <Route exact path='/vote' render= {() => <Vote/>}/>
          </userContext.Provider>
        </Router>
      );
    }
  }
  export default App;