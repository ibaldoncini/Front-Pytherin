import React from 'react';
import FormCreateRoom from './components/CreateRoom';
import {BrowserRouter, Route} from 'react-router-dom';
import Button from './components/Button';


function App() {

  return (
    <BrowserRouter>

          <Route exact path="/createRoom">
            <FormCreateRoom />
          </Route>

          <Route exact path="/">
            <div> 
              <header> Bienvenido a Secret-Voldemort </header>
              <Button path="/createRoom" text="Create a new room"/>
            </div>
          </Route>

    </BrowserRouter>
  );
}

export default App;