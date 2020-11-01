import React from 'react';
import Button from './Button';
import Cookies from 'js-cookie';
import { Redirect, Link } from 'react-router-dom';

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: ''
		}

		this.logOut = this.logOut.bind(this)
	}

	logOut() {
		console.log("Cookie a borrar:" + this.state.username)
		Cookies.remove(this.state.username)
	}

  render() {

		Object.values(Cookies.get()).filter(p => {
      console.log(p)
      this.state.username = p
			})
			
		return(
			<div>
			<h1> Hello {this.state.username}</h1>
			<Button path='/createRoom' text='Create room'></Button>
			<button>Profile</button>
			<button onClick={this.logOut}>Logout</button>
			</div>
		)
  }
} export {Home}