import React from 'react';
import { Login } from './components/Login';
import { BrowserRouter, Route } from 'react-router-dom';


// This is the "main".
// We use rout for organization of our single page app.
function App() {


  return (
    <BrowserRouter>
      <Route exact path='/'>
      <Route exact path='/registerPage'/>
        <Login/>
      </Route>
    </BrowserRouter>
  );
}
export default App;



