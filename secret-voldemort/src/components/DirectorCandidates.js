import React from 'react';
import Popup from 'reactjs-popup';
import { sendRequest } from '../services/request';

export function DirectorCandidates(props) {

  
  const handleSelection = (e) => {
    const selectedUser = e.target.name;
    const keys = {director_email: selectedUser};
    const authorizationToken = "Bearer " + props.user_token;
    const header = {
      Accept: "application/json",
      Authorization: authorizationToken,
      "Content-Type": "application/json"
    };
    const path = `http://127.0.0.1:8000/${props.room_name}/director`
    
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
            props.players.map((user) => 
              ((user !== props.name) && (user !== props.last_director)) ?
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
