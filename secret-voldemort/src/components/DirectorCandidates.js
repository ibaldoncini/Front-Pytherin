import React, { useState, useEffect, useContext } from 'react';
import Popup from 'reactjs-popup';
import { sendRequest } from '../services/request';
import { userContext } from '../user-context';

export function DirectorCandidates(props) {

  const [room_name, setRoomName] = useState('')
  const [name, setName] = useState('')
  const [players, setPlayers] = useState([])
  const [last_director, setLastDirector] = useState('')
  
  const context = useContext(userContext)

  useEffect(() => {
    setRoomName(props.room_name)
    setName(props.name)
    setLastDirector(props.last_director)
    setPlayers(props.players)
  }, [props]);
  
  const handleSelection = (e) => {
    const selectedUser = e.target.name;
    const keys = {director_email: selectedUser};
    const authorizationToken = "Bearer " + context.token;
    const header = {
      Accept: "application/json",
      Authorization: authorizationToken,
      "Content-Type": "application/json"
    };
    const path = `http://127.0.0.1:8000/${room_name}/director`
    
    sendRequest("PUT", header, keys, path).then(async response => {
      const data = await response.json();

      if (response.ok){
        console.log(data.message);
      } else {
        console.log(data.detail)
      }
    }).catch(error => console.log(error));
  }

  return(
    <Popup trigger={<button>Propose Director</button>}>
      {close =>
        <ul>
          {
            players.map((user) => 
              ((user !== name) && (user !== last_director)) ?
                <li> {user} 
                  <button name={user} onClick={handleSelection} onClickCapture={close}>
                      Select
                  </button>
                </li>
              :
                <li>
                  {user} (X)
                </li>
            )
          }
        </ul>
      }
    </Popup>
  );
}
