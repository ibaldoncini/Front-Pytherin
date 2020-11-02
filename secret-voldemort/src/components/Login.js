import React from 'react';
import { Head } from './Head';
import { Link, Redirect } from 'react-router-dom';
import verifyEmail from '../services/verification';
import { sendRequest } from '../services/request';
import { userContext } from '../user-context';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

/* Login	/users/	POST		{email,password}	Token	200 OK-401 UNAUTHORIZED-400 BAD REQUEST */ 



/* Login have the form */
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      psw: '',
      redirect: false,
      auth: false,
    }
   
    this.handleLogin = this.handleLogin.bind(this);
    this.tokenDecode = this.tokenDecode.bind(this);
  }
  
  static contextType = userContext;


  /* Decode the token and fill the user context */
  tokenDecode() {

    const uData = jwt_decode(this.context.token);
    
    this.context.setUsername(uData.username);
    this.context.setEmail(uData.email);
   
    Cookies.set("user", {
      username: this.context.username,
      token: this.context.token,
      email: this.context.email,
      icon: this.context.icon
    });
    
    this.setState({redirect: true});
  }

  /* Here i want to stablish the connection with the endpoint for login.
  I think that i need to add redux for this.*/
  handleLogin(e) {
    
    e.preventDefault();
    const email = this.state.email;
    
    if(this.state.psw === '' || this.state.username === '') {
      alert("You left empty fields");
      document.getElementById('inemail').value="";
      document.getElementById('inpsw').value="";
    } else {

      if (verifyEmail(email)) {
        
        const psw = this.state.psw
        const partsOfEmail = email.split('@');
        const firstpart = partsOfEmail[0];
        const secondPart = partsOfEmail[1];
        
        const keys = `grant_type=&username=${firstpart}%40${secondPart}&` + 
          `password=${psw}&scope=&client_id=&client_secret=`;
        
        const headers = {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
        }
        
        // This is the function to comunicate with the REST-API.
        sendRequest("POST", headers, keys, "http://127.0.0.1:8000/users").then(async response => {
          
          // token is an object {access_token, type}
          const data = await response.json();
          if (response.ok){
            const token = data.access_token;
            this.context.setToken(token);

            // Now we decode the token to complete the user context
            this.tokenDecode();
            
          } else {
            document.getElementById('inemail').value="";
            document.getElementById('inpsw').value="";
            console.log(data);
            alert(data.detail);
          }
          
        }).catch(error => {
          console.log("There was an error", error);
        })
      }
    }
  }

  render() {
    const cookie = Cookies.getJSON("user");
    if (cookie !== undefined || this.state.redirect) {
      this.context.setUsername(cookie.username);
      this.context.setEmail(cookie.email);
      this.context.setToken(cookie.token);
      this.context.setIcon(cookie.icon);
      return (<Redirect to='/home'/>);
    } else {
      return (
        <userContext.Consumer> 
          {({token, setToken}) => (
            
            <div className='login-form'>
              <Head/>
              <form onSubmit={this.handleLogin}>
                <label> 
                  E-mail: <br/>  
                  <input id='inemail' type='email' value={this.state.email} 
                  onChange={e => this.setState({email: e.target.value})}/>
                </label>
                <br/>
                <label>
                  Password: <br/> 
                  <input id='inpsw' type='password' value={this.state.psw} 
                  onChange={e => this.setState({psw: e.target.value})}/>

                </label><br/>
                <input type='submit' value='Login'/> 
              </form>
              <p>Don't have an account yet? <Link to={`/registerPage`}> Sign up here </Link> </p>
            </div>
          )} 
        </userContext.Consumer>
      )
  }
}
} export {Login}