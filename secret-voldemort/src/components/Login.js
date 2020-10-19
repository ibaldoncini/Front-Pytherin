import React from 'react';



/* Login	/users/	POST		{email,password}	Token	200 OK-401 UNAUTHORIZED-400 BAD REQUEST */ 


/* Login have the form */
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {email: '', psw: ''}

    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        
        <form>
          <label> E-mail: <br/>  
            <input type='text' name='email' value={this.state.email} onChange={this.handleChange} /> 
          </label> <br/>
          <label>Contraseña: <br/> 
            <input type='password' name='psw' value={this.state.psw} onChange={this.handleChange} />
          </label>  
          <br/>
          <input type='submit' value='Login' onClick={this.handleLogin}/> 
        </form>

        <div>
          <p>Aun no tienes una cuenta, <a href=''>Registrate!</a> </p>
        </div>
      </div>
    );
  }
} export {Login};


