import React, { useContext, useState } from 'react';
import { Button } from '../../src/components/utils/Button'
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { userContext } from '../user-context';
import { SetContext } from '../../src/components/utils/SetContext';


export function Home(props) {

	const [logged, update] = useState(true);
	const context = useContext(userContext);

	const logOut = () => {
		Cookies.remove("user");
		update(false)
	}

	useEffect(() => {
        if(context.username === '') {
            SetContext("user")
        }
    }, [context])
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
									<h1 class='home-title'> Hello {context.username}</h1>
								</div>
								<div class='column'> 
									<Button style='home-button is-rounded is-large is-fullwidth m-6' path='/createRoom' text='Create room' type='btncr'/>
<<<<<<< HEAD:secret-voldemort/instrumented/components/Home.js
									<Button style='home-button is-rounded is-large is-fullwidth m-6' path='/update_profile' text='Change nickname' type='btncn'/>
=======
									<Button style='home-button is-rounded is-large is-fullwidth m-6' path='/listRoom' text='Join room' type='btncr'/>
									<button class='home-button is-rounded is-large is-fullwidth m-6'>Profile</button>
>>>>>>> Syle added, TODO: Testing:secret-voldemort/src/components/Home.js
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
