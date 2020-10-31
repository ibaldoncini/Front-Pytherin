import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { sendRequest } from '../services/request';
import { VotesList } from './VotesList';

/* TODO: Need to add the list of users and polling to obtain the votes of the 
 * other players.
 * TODO: Although i need to disable or close the popup when i click one time 
 */


/* PROPS NEEDED: roomname, playerlist */ 
export function Vote(props) {

  const[vote, setVote] = useState('');
  // const [usersVote, addUservote] = useState([]);
  const userData = [
    {user: "jerober",
      vote: "Lumox"},
    {user: "antomin",
      vote: "Nox"}]
  
  const handleVote = (e) => {
    const roomname = props.roomname;
    const body = `{"vote": ${e.target.name}}`;
    const header = {Accept: "application/json", "Content-Type": "application/json"};
    const path = `http://localhost:8000/${roomname}/vote`

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
    if(e.target.name === "Lumox") {
      setVote('Lumox');
    } else {
      setVote('Nox');
    }
  }

  const handlePolling = () => {

    /* //hago el polling pidiendo la lista de usuarios junto con sus votos
      .then(async response => {
        data = await response.json();
        // suponiendo que data es una lista
        data.map(user => {
          addUservote(usersVote.append({user: user, vote: voto}))
        })
      })
    */
  }
  
  return(
    <div> 
        <Popup trigger={<button>Vote</button>} modal position='right center'>
          {(close) =>
            vote !== '' ? 
              <VotesList usersVotes={userData.concat({user: "you", vote: vote})}/>
              : 
              <div>
                <h3>Vote for the porposed government</h3>
                <button name='lumox' onClick={handleVote} >Lumox</button>
                <button name='nox' onClick={handleVote}>Nox</button>
              </div>
          }
        </Popup>
    </div>
  );
}