import React from 'react';
import { Redirect } from 'react-router-dom';
import { userContext } from '../user-context';
import Button from './Button';

export function Home(props) {
    const contextType = userContext
    return(
        <userContext.Consumer>
            {({token, setToken}) => (
                token ?
                <div>
                    <h1> Hello user with token {token}</h1>
                    <div>
                        <Button path='/createRoom' text='Create room'></Button>
                        <button>Join a room</button>
                        <button>Profile</button>
                    </div> 
                </div>
                :
                <Redirect to='/'/>
            )
            }
        </userContext.Consumer>
    )
}