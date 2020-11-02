import React, { useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { sendRequest } from '../services/request';
import { VotesList } from './VotesList';
import { userContext } from '../user-context';

/* TODO: Need to add the list of users and polling to obtain the votes of the 
 * other players.
 * TODO: Although i need to disable or close the popup when i click one time 
 */


/* PROPS NEEDED: roomname */ 
export function Vote(props) {
  
  const context = useContext(userContext);

  const handleVote = (e) => {
    const roomname = props.roomname;
    const authorizationToken = "Bearer " + context.token
    const vote = e.target.name;
    const keys = {"vote": vote}
    const header = {
      Accept: "application/json",
      Authorization: authorizationToken,
      "Content-Type": "application/json"
    };
    const path = `http://127.0.0.1:8000/${roomname}/vote`

    /* Send the vote decision */
    sendRequest("PUT", header, keys, path).then(async response => {
      const data = await response.json();
      if (response.ok) {
        console.log("Vote succesfully");
      } else {
        console.log("Error detail: " + data.detail.json());
      }
    }).catch(error => {
      console.log("There was an error on voting");
    });
  }
  
  return(
    <userContext.Consumer>
      {token => 
        <div>
            <Popup trigger={<button>Vote</button>} modal position='right center'>
              {(close) => 
                  <div>
                    <h3>Vote for the porposed government</h3>
                    <button name='Lumos' onClick={handleVote} onClickCapture={close} >Lumos</button>
                    <button name='Nox' onClick={handleVote} onClickCapture={close} >Nox</button>
                  </div>
              }
            </Popup>
        </div>
      }
    </userContext.Consumer>
  )
}