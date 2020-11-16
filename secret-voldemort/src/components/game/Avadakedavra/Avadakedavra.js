import React from 'react';
import Popup from 'reactjs-popup';
import { sendRequest } from '../../../services/request';

// PROPS {phase, room_name, players, minister, token, email}
export const Avadakedavra = props => {

  const handleSpeell = target => {

    const header = {
      Accept: "application/json",
      Authorization: "Bearer " + props.token,
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
    <Popup 
      trigger={
        <button id='trigger' class='panel-button'>
          Avadakedavra `
        </button>
      } modal position='right center'>
      
      {close => 
        <div class='container has-text-centered panel-bg'>
          <p id='title' class='panel-title'> Choose who to cast the spell on </p>
          <div class='column is-6 is-offset-3 align-cntr is-vcentered'>
            <ul>
              {
                props.players.map(p =>
                p !== props.minister ?
                  <li id={'i-' + p}class='i-payerlist'>
                    {p} 
                    <button id={'cast-' + p} class='room-button my-2 mx-2' 
                      onClick={()=> handleSpeell(p)} 
                      onClickCapture={close}>`</button>
                  </li>
                :
                  <div></div>
                
                )
              }
            </ul>
          </div>
        </div>
      }
    </Popup>
  );
}