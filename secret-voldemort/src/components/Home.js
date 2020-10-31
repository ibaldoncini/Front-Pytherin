import React from 'react';
import { Redirect } from 'react-router-dom';
import { userContext } from '../user-context';
import Button from './Button';

export function Home(props) {

  return(
    <userContext.Consumer>
        {({username, token}) => (
            token ?
            <div>
            
                <div>
                   <h1> Hello {username}</h1>
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