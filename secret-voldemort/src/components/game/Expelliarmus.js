import React, { useContext, useState, useEffect } from 'react';
import { sendRequest } from '../../services/request';
import { userContext } from '../../user-context';
import Phoenix from '../../images/phoenix_order.png'; // Cambiar por algo significativo a expelliarmus
import Popup from 'reactjs-popup';
import '../../popup_custom.css';


/* PROPS_NEEDED: minister, director, room_name */

export const Expelliarmus = (props) => {

  const context = useContext(userContext);
  const [room_name, setRoomName] = useState('');

  useEffect(() => {
    setRoomName(props.room_name);
    let btnExpelliarmus = document.getElementById("openPopup")
    btnExpelliarmus.click()
  },[props]);

  /* When the user clicks, the backend is notified so
   that the game can be put into the Expelliarmus phase */

  const reject_expelliarmus = () => {

    const authorizationToken = "Bearer " + context.token

    const headers = {
      Accept: "application/json",
      Authorization: authorizationToken,
      "Content-Type": "application/json"
    }

    const keys = {
      "vote": "Nox"
    }

    const path = "http://127.0.0.1:8000/" + room_name + "/expelliarmus"

    sendRequest('PUT', headers, keys, path).then(async response => {
      const data = await response.json();
      if(!response.ok){ 
        console.log("some error")
      }else{
        console.log("Reject cast expelliarmus.")
      }
    }).catch(error => {
        console.log("Ups! something went wrong.")
    })

  }
  
  const accept_expelliarmus = () => {

    const authorizationToken = "Bearer " + context.token

    const headers = {
      Accept: "application/json",
      Authorization: authorizationToken,
      "Content-Type": "application/json"
    }

    const keys = {
      "vote": "Lumos"
    }

    const path = "http://127.0.0.1:8000/" + room_name + "/expelliarmus"

    sendRequest('PUT', headers, keys, path).then(async response => {
      const data = await response.json();
      if(!response.ok){ 
        console.log("some error")
      }else{
        console.log("Confirm cast expelliarmus.")
      }
    }).catch(error => {
        console.log("Ups! something went wrong.")
    })
  }

  return(
    <div class="align-cntr">
      (showPopup) ? 
        <Popup className='divination-modal' 
              trigger={
                        <button id='openPopup' class="btn-spell">
                        </button>
                    }
              modal position='right center'
              > 
            {close => (
              <div class='container has-text-centered'>
              <h3 class='room-title'>The director said Expelliarmus, and you?</h3>
              <button class='panel-button is-medium mx-3' name='acceptoExp' onClick={accept_expelliarmus} onClickCapture={close}>¡Expelliarmus!</button>
              <button class='panel-button is-medium mx-3' name='rejectoExp' onClick={reject_expelliarmus} onClickCapture={close}>Reject</button>
              </div>
            )}
        </Popup>
      :
      <div></div>
    </div>
  )
}