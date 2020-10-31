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
export const App = props => {

  const setToken = token => {
     this.setState({token});
  }

  const setUsername = username => {
    this.setState({username});
  }
  
  const setEmail =  email => {
    this.setState({email});
  }

  const setIcon = icon => {
    this.setState({icon});
  }

  const state = {
    token: '',
    username: '',
    email: '',
    icon: {},
    setToken: setToken,
    setUsername: setUsername,
    setEmail: setEmail,
    setIcon: setIcon
  };
    return (
      <BrowserRouter>
        <userContext.Provider value={state}>
          <Route exact path='/' render= {() => <Login/>}/>
          <Route exact path='/home' render= {() => <Home/>}/>
          <Route exact path='/createRoom' render= {() => <CreateRoom/>}/>
          <Route exact path='/lobbyRoom' render= {() => <LobbyRoom/>}/>
          <Route exact path='/gameRoom' render= {() => <Game/>}/>
        </userContext.Provider>
        <Route exact path='/vote' render= {() => <Vote/>}/>
        <Route exact path='/registerPage' render= {() => <Register/>}/>
      </BrowserRouter>
    );
}