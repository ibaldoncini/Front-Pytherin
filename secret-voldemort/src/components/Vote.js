import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { sendRequest } from '../services/request';
import { VotesList } from './VotesList';

/* TODO: Need to add the list of users and polling to obtain the votes of the 
 * other players.
 * TODO: Although i need to disable or close the popup when i click one time 
 */


/* PROPS NEEDED: roomname */ 
export function Vote(props) {

  const handleVote = (e) => {
    const room_name = props.room_name;
    const body = `{"vote": ${e.target.name}}`;
    const header = {Accept: "application/json", "Content-Type": "application/json"};
    const path = `http://localhost:8000/${room_name}/vote`

    /* Send the vote decision */
    /*sendRequest("PUT", header, body, path).then(async response => {
      if (response.ok) {
        console.log("Vote succesfuly");
      } else {
        console.log("Vote get lost");
      }
    }).catch(error => {
      console.log("There was an error on voting");
    });*/
  }
  
  return(
    <div>
        <Popup trigger={<button>Vote</button>} modal position='right center'>
          {(close) => 
              <div>
                <h3>Vote for the porposed government</h3>
                <button name='lumox' onClick={handleVote} onClickCapture={close} >Lumox</button>
                <button name='nox' onClick={handleVote} onClickCapture={close} >Nox</button>
              </div>
          }
        </Popup>
    </div>
  )
}