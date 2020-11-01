import React, { Component } from 'react';
import { Login } from './components/Login';
import { BrowserRouter, Route } from 'react-router-dom';
import { userContext } from './user-context';
import { Home } from './components/Home';
import { Register } from './components/Register';
import CreateRoom from './components/CreateRoom';
import { Vote } from './components/Vote';


// This is the "main".
// We use rout for organization of our single page app.
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
      <BrowserRouter>
        <userContext.Provider value={this.state}>
          <Route exact path='/' render= {() => <Login/>}/>
          <Route exact path='/home' render= {() => <Home/>}/>
          <Route exact path='/registerPage' render= {() => <Register/>}/>
          <Route exact path='/createRoom' render= {() => <CreateRoom/>}/>
          <Route exact path='/vote' render={() => <Vote roomname="prueba"/>}/>
        </userContext.Provider>
      </BrowserRouter>
    );
  }
}
export default App;