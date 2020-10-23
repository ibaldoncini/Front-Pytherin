import React from 'react';
import { Redirect } from 'react-router-dom';
import { userContext } from '../user-context';

export function Home(props) {
    const contextType = userContext
    return(
        <userContext.Consumer>
            {({token, setToken}) => (
                token ?
                <div>
                    <h1> Hello user with token {token}</h1>
                    <div>
                        <button>Crear Partida</button>
                        <button>Unirse a Partida</button>
                        <button>Perfil</button>
                    </div> 
                </div>
                :
                <Redirect to='/'/>
            )
            }
        </userContext.Consumer>
    )
}