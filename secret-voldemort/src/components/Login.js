import React from 'react';
import { Head } from './Head';
import { Link } from 'react-router-dom';
import { loginSuc } from '../actions';
import { connect } from 'react-redux';
import { createStore } from 'redux';
//import { loged_user } from './reducers';
 
/* Login	/users/	POST		{email,password}	Token	200 OK-401 UNAUTHORIZED-400 BAD REQUEST */ 


// TERMINAR DE IMPLEMENTAR REDUCER CON LA FUNCION PARA EL ENDPOINT (CREAR STORE EN APP)

/*let store = createStore(loged_user);

const action = loginSuc("3453asd");
store.dispatch(action);*/

/* Login have the form */
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '', 
      psw: '',
      valid_email: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  
  
  
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    
    this.setState({
      [name]: value
    });
  }


  /* Here the email is verified, concretly if has two @ and some . */
  verifyEmail() {
    const email = this.state.email;
    const regExpMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;  
    
    if (regExpMail.test(email)) {
      this.setState({
        valid_email: true
      }); 
    } else {
      alert("The inpunt haven't e-mail format.")
    }
  }
  

  /* Here i want to stablish the connection with the endpoint for login.
  * I think that i need to add redux for this.
  */
  handleLogin(e) {
    this.verifyEmail();

    if (this.state.valid_email === true) {
      const keys = {"username": this.state.email, "password": this.state.psw}
      

      // This is the function to comunicate with the REST-API.
      fetch('/users', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(keys)
      });

    } else {
      e.preventDefault()
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
          <p>Aun no tienes una cuenta, <Link to={`/register`}> Registrate! </Link> </p>
        </div>
      </div>
    );
  }
} export {Login};