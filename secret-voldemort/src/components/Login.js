import React from 'react';
import { Head } from './Head';
import { Link } from 'react-router-dom';
import verifyEmail from '../services/verification';
//import sendRequest from '../services/request';

/* Login	/users/	POST		{email,password}	Token	200 OK-401 UNAUTHORIZED-400 BAD REQUEST */ 


async function obtainToken(response) {
        
  const data = await response.json();
  if (response.ok){
    return data;
  }
}


/* Login have the form */
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      psw: '',
      valid_email: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }
  
  
  /* handle the change on imputs */
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    
    this.setState({
      [name]: value
    });
  }


  async sendRequest(methodOpt, keys) {
    console.log("On sendRequest method");
    const response = await fetch("http://127.0.0.1:8000/users", {
      body: keys,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    })
    return response;
  }


  /* Here i want to stablish the connection with the endpoint for login.
  * I think that i need to add redux for this.
  */
  handleLogin(e) {
    
    e.preventDefault();
    const email = this.state.email;
    
    if (verifyEmail(email)) {
      
      const psw = this.state.psw
      const partsOfEmail = email.split('@');
      const firstpart = partsOfEmail[0];
      const secondPart = partsOfEmail[1];

      const keys = `grant_type=&username=${firstpart}%40${secondPart}&` + 
        `password=${psw}&scope=&client_id=&client_secret=`;
      

      // This is the function to comunicate with the REST-API.
      this.sendRequest("POST", keys).then(async response => {
        
        // token is an object {access_token, type}
        const token = (await obtainToken(response)).access_token;

      }).catch(error => {
        console.error("There was an error", error);
      });
    } else {
      alert("Invalid e-mail format.");
    }
  }


  render() {
    return (
      <div className='login-form'>
        <Head syle='head_style' />
        <form onSubmit={this.handleLogin}>
          <label> 
            E-mail: <br/>  
            <input type='email' name='email' value={this.state.email} onChange={this.handleChange}/>
          </label> <br/>
          <label>
            Contraseña: <br/> 
            <input type='password' name='psw' value={this.state.psw} onChange={this.handleChange} />

          </label><br/>
          <input type='submit' value='Login'/> 
        </form>

        <div className='goto-register'>
          <p>Aun no tienes una cuenta, <Link to={`/registerPage`}> Registrate! </Link> </p>
        </div>
      </div>
    );
  }
} export {Login};