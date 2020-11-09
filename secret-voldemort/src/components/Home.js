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
					<div class='section'>
						<div class='container mt-6'>
							<div class='columns is-desktop is-vcentered'>
								<div class='column'>
									<h1 class='home-title'> Hello {context.username}</h1>
								</div>
								<div class='column'> 
									<Button style='home-button is-rounded is-large is-fullwidth m-6' path='/createRoom' text='Create room' type='btncr'/>
									<button class='home-button is-rounded is-large is-fullwidth m-6'>Profile</button>
									<button class='home-button is-rounded is-large is-fullwidth m-6' onClick={logOut}>Logout</button>
								</div>
							</div> 
						</div>
					</div>
					<div class='hero is-bold is-medium is-fullwidth'>
						<div class='hero-body has-text-centered'>
							<div class='container'>
								<h1 class='hero-title is-1'>Secret Voldemort</h1>
							</div>
						</div>
						
					</div>
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
