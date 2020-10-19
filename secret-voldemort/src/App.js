import React from 'react';
import { Login } from './components/Login';
import { Head } from './components/Head'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <meta charSet='utf-8'/>
      </header>
      <body>
        <Head/>
        <Login/>
      </body>
    </div>
  );
}

export default App;
