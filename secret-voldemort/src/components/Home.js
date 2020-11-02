import React, { useContext, useState } from 'react';
import Button from './Button';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { userContext } from '../user-context';

export function Home(props) {

	const [logged, update] = useState(true);
	const context = useContext(userContext);

	const logOut = () => {
		Cookies.remove("user");
		update(false)
	}

	if(context.username === '') {
		const cookie = Cookies.getJSON("user");
		if(cookie !== undefined) {
			context.setUsername(cookie.username);
			context.setEmail(cookie.email);
			context.setToken(cookie.token);
			context.setIcon(cookie.icon);
		}
	}
	console.log(context.token)

	return (
		<div>
			{ (Cookies.get("user") !== undefined) ? (
				logged ? 
					<div> 
						<h1> Hello {context.username}</h1>
						<Button path='/createRoom' text='Create room'></Button>
						<button>Profile</button>
						<button onClick={logOut}>Logout</button>
					</div>
				:
				<Redirect to='/'/>
				)
				:
				<Redirect to='/'/>
			}
		</div>
		
	);
} 
