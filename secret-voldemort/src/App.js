import React, { Component } from 'react';
import { Login } from './components/Login';
import { BrowserRouter, Route } from 'react-router-dom';
import { userContext } from './user-context';
import { Home } from './components/Home';
import Register from './register';
import CreateRoom from './components/CreateRoom';


// This is the "main".
// We use rout for organization of our single page app.
class App extends Component {
  setToken = token => {
     this.setState({token});
  }

  state = {
    token: '',
    setToken: this.setToken
  };

  render() { 
    return (
      <BrowserRouter>
        {/* <Route exact path='/register' render= {() => <Register/>}/> */}
        <userContext.Provider value={this.state}>
          <Route exact path='/' render= {() => <Login/>}/>
          <Route exact path='/home' render= {() => <Home/>}/>
          <Route exact path='/registerPage' render= {() => <Register/>}/>
          <Route exact path='/createRoom' render= {() => <CreateRoom/>}/>
        </userContext.Provider>
      </BrowserRouter>
    );
  }
}
export default App;



