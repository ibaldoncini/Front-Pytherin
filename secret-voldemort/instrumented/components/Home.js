<<<<<<< HEAD:secret-voldemort/instrumented/components/Home.js
<<<<<<< Updated upstream:secret-voldemort/instrumented/components/Home.js
import React, { useContext, useEffect, useState } from 'react';
import Button from './Button';
||||||| constructed merge base:secret-voldemort/src/components/Home.js
import React, { useContext, useState } from 'react';
<<<<<<< Updated upstream:secret-voldemort/instrumented/components/Home.js
import Button from './Button';
=======
import React, { useContext, useState } from 'react';
import { Button } from './Button';
>>>>>>> Stashed changes:secret-voldemort/src/components/Home.js
||||||| constructed merge base:secret-voldemort/src/components/Home.js
=======
import React, { useContext, useState, useEffect } from 'react';
>>>>>>> 3edaa45f910ac3fa2cbc64519b95a4c1b0d8e71f:secret-voldemort/src/components/Home.js
import Button from './Button';
=======
import { Button } from './Button';
>>>>>>> Stashed changes:secret-voldemort/src/components/Home.js
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

	useEffect(() => {
<<<<<<< HEAD:secret-voldemort/instrumented/components/Home.js
        if(context.username === '') {
            const cookie = Cookies.getJSON("user");
            if(cookie !== undefined) {
                context.setUsername(cookie.username);
                context.setEmail(cookie.email);
                context.setToken(cookie.token);
                context.setIcon(cookie.icon);
            }
        }
    }, [context])
=======
		if(context.username === '') {
			const cookie = Cookies.getJSON("user");
			if(cookie !== undefined) {
				context.setUsername(cookie.username);
				context.setEmail(cookie.email);
				context.setToken(cookie.token);
				context.setIcon(cookie.icon);
			}
		}
	}, [context])
>>>>>>> 3edaa45f910ac3fa2cbc64519b95a4c1b0d8e71f:secret-voldemort/src/components/Home.js
	console.log(context.token)
	console.log(context.username)

	return (
		<div>
			{ (Cookies.get("user") !== undefined) ? (
				logged ? 
				<div>
					<div class='section'>
						<div class='container mt-6'>
							<div class='columns is-desktop is-vcentered'>
								<div class='column'>
									<h1 id='welcome' class='home-title'> Hello {context.username}</h1>
								</div>
								<div class='column'> 
<<<<<<< HEAD:secret-voldemort/instrumented/components/Home.js
									<Button style='home-button is-rounded is-large is-fullwidth m-6' path='/createRoom' text='Create room' type='btncr'/>
									<Button style='home-button is-rounded is-large is-fullwidth m-6' path='/update_profile' text='Change nickname' type='btncn'/>
									<button class='home-button is-rounded is-large is-fullwidth m-6' onClick={logOut}>Logout</button>
=======
									<Button id='create' style='home-button is-rounded is-large is-fullwidth m-6' path='/createRoom' text='Create room' type='btncr'/>
									<Button id='join' style='home-button is-rounded is-large is-fullwidth m-6' path='/listRoom' text='Join room' type='btncr'/>
									<button class='home-button is-rounded is-large is-fullwidth m-6'>Profile</button>
									<button id='logout' class='home-button is-rounded is-large is-fullwidth m-6' onClick={logOut}>Logout</button>
>>>>>>> 3edaa45f910ac3fa2cbc64519b95a4c1b0d8e71f:secret-voldemort/src/components/Home.js
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
