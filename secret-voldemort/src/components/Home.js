import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { userContext } from '../user-context';
import Button from './Button';
import { sendRequest } from '../services/request';

export function Home(props) {

  return(
    <userContext.Consumer>
        {({username, token}) => (
            token ?
            <div>
                {username !== '' ?
                    <div>
                    <h1> Hello {username}</h1>
                        <Button path='/createRoom' text='Create room'></Button>
                        <button>Join a room</button>
                        <button>Profile</button>
                    </div>
                    :
                    <p>Loading...</p>
                }
            </div>
            :
            <Redirect to='/'/>
        )
        }
    </userContext.Consumer>
  )
}