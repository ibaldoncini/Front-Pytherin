/* TODO : Generalizar handleChange en clase Login */ 

/* HEAD */
class Head extends React.Component {
  render() {
    return (
      <div>
        <h1>Secret-voldemort</h1>
        <h2>Para jugar es necesario loguearse</h2>
      </div>
    );
  }
}


/* Login have the form */
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {user: '', psw: ''}

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }

  
  handleChange1(event) {
    this.setState({user: event.target.value});
  }
  
  handleChange2(event) {
    this.setState({psw: event.target.value});
  }

  handleSubmit() {
    alert("New Log In from: \n" + this.state.user);
  }

  render() {
    return (
      <form>
        <label>Usuario:  
          <input type='text' value={this.state.user} onChange={this.handleChange1} /> 
        </label> <br/>
        <label>Contraseña: 
          <input type='password' value={this.state.psw} onChange={this.handleChange2} />
        </label>  
        <br/>
        <button onClick={this.handleSubmit}>Log in</button> 
      </form>
    );
  }
}


class App extends React.Component {
  render () {
    return (
      <div>
        <Head/>
        <Login/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));


