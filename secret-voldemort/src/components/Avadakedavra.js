import React, { useContext, useEffect } from 'react';
import { userContext } from '../user-context';
import Popup from 'reactjs-popup';
import { sendRequest } from '../services/request';
import Cookies from 'js-cookie';

// PROPS {phase, room_name, players, minister}
export const Avadakedavra = props => {

  
  const context = useContext(userContext);
  
  useEffect(() => {
    if (context.token === '') {
      const cookie = Cookies.getJSON('user');
      if(cookie !== undefined){
        context.setEmail(cookie.email);
        context.setToken(cookie.token);
        context.setUsername(cookie.token);
      }
    }
  }, [context])

  const handleSpeell = target => {

    const header = {
      Accept: "application/json",
      Authorization: "Bearer " + context.token,
      "Content-Type": "application/json"
    }

    const keys = {
      target_email: target
    }
    
    const path = `http://localhost:8000/${props.room_name}/cast/avada-kedavra`

    sendRequest("PUT", header, keys, path).then(async response => {

      const data = await response.json();

      if (response.ok) {
        console.log("Avadakedavra succ: " + data.detail);
      } else {
        console.log("Avadakedavra failed: " + data.detail);
      }
    }).catch(error => console.log("there was an error: " + error.detail));
  }

  return (
    (props.phase === 8 && context.username === props.minister) 
    ? 
      <userContext.Consumer>
        {token => 
          <Popup 
            trigger={
              <button class='room-button is-rounded is-large'>
                Avadakedavra `
              </button>
            } modal position='right center'>
            
            {close => 
              <div class='container has-text-centered'>
                <p class='room-title'> Choose who to cast the spell on </p>
                <div class='column is-4 is-offset-4 align-cntr is-vcentered'>
                  <ul>
                    {
                      props.players.map(p => 
                      <li>
                        {p} 
                        <button class='room-button my-2 mx-20' 
                          onClick={handleSpeell(p)} 
                          onClickCapture={close}>`</button>
                      </li>)
                    }
                  </ul>
                </div>
              </div>
            }
          </Popup>
        }
      </userContext.Consumer>
    :
      <div>{console.log("SEPIERDE EL CONTEXTTTT")}</div>
  );
}