import React from 'react';



/* Login	/users/	POST		{email,password}	Token	200 OK-401 UNAUTHORIZED-400 BAD REQUEST */ 


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
    const email_2parts = email.split('@');  
    const lth = email_2parts.length;
    if (lth !== 2 && email_2parts[lth-1].includes(".")) {
      alert("El e-mail ingresado es invalido.");
    } else {
      this.setState({
        valid_email: true
      });
    }
  }
  
  /* Here i want to stablish the connection with the endpoint for login.
  * I think that i need to add redux for this.
  */
  handleLogin() {
    this.verifyEmail();

    if (this.state.email === true) {
      const keys = {"email": this.state.email, "password": this.state.psw}
    }
  }
 



  render() {
    return (
      <div>
        
        <form>
          <label> E-mail: <br/>  
            <input type='email' name='email' value={this.state.email} onChange={this.handleChange} /> 
          </label> <br/>
          <label>Contraseña: <br/> 
            <input type='password' name='psw' value={this.state.psw} onChange={this.handleChange} />
          </label>  
          <br/>
          <input type='submit' value='Login' onClick={this.verifyEmail}/> 
        </form>

        <div>
          <p>Aun no tienes una cuenta, <a href=''>Registrate! </a> </p>
        </div>
      </div>
    );
  }
} export {Login};


