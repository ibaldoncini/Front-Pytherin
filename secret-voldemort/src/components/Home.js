import React, { useContext, useState } from 'react';
import Button from './Button';
import Cookies from 'js-cookie';
import { userContext } from '../user-context'
import { Redirect } from 'react-router-dom';

export function Home(props) {
	const [logged, unLog] = useState(true);
	const context = useContext(userContext);

	const logOut = () => {
		console.log("Cookie a borrar:" + context.username)
		Cookies.remove("user");
		unLog(false);
	}

	return (
		<div>
			{logged ?
				<div> 
					<h1> Hello {context.username}</h1>
					<Button path='/createRoom' text='Create room'></Button>
					<button>Profile</button>
					<button onClick={logOut}>Logout</button>
				</div>
				:
				<Redirect to='/'/>

			}
		</div>
		
	);
} 