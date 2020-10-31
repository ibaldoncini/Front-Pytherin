import React from 'react';
import Button from './Button';
import { userContext } from '../user-context';
import { Redirect } from 'react-router-dom';
import { render } from '@testing-library/react';

class Home extends React.Component {

  render() {
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
} export {Home}