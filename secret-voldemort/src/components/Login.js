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
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
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
            <section class='login-page'>
                <Head/>
              <div class='columns'>
                <div class='column'>
                  <div class='container'> 

                    <div class='container'>
                      <form onSubmit={this.handleLogin}>
                        <div class='field'>
                          <label class='label is-large'> E-mail: </label>
                          <div class='control'>
                            <input  class='input is-rounded is-large' id='inemail' type='email' value={this.state.email} 
                            onChange={e => this.setState({email: e.target.value})}/>                   
                          </div>
                        </div>
                        
                        <div class='field'>
                          <label class='label is-large'> Password: </label>
                          <div class='control'>
                            <input class='input is-rounded is-large' id='inpsw' type='password' value={this.state.psw} 
                            onChange={e => this.setState({psw: e.target.value})}/>
                          </div>
                        </div>
                        <div class='field'>
                          <input class='button is-medium is-fullwidht is-rounded' type='submit' value='Login'/> 
                        </div>
                      </form>
                    </div>
                  
                  </div>

                </div>
                <div class='column'>
                  <p class='has-text-white is-large is-size-2 is-right'>Don't have an account yet? <br/><Link class='button' to={`/registerPage`}> Sign up here </Link> </p>
                </div>
              </div>
              
              
            </section>
           
          )} 
        </userContext.Consumer>
      )
  }
}
} export {Login}