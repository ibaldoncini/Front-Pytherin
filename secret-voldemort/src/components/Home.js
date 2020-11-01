import React from 'react';
import Button from './Button';
import { userContext } from '../user-context';
import { Redirect } from 'react-router-dom';

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