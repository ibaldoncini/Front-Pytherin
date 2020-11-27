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
  const [casted, setCasted] = useState(false)
  const [minister, setMinister] = useState('');
  const [director, setDirector] = useState('');
  const [showPopup, setShowpopup] = useState(true);

  useEffect(() => {
    setRoomName(props.room_name);
    setMinister(props.minister);
    setDirector(props.director);
    setShowpopup(true);
    let btnExpelliarmus = document.getElementById("openPopup")
    btnExpelliarmus.click()
},[props]);

  /* When the user clicks, the backend is notified so
   that the game can be put into the Expelliarmus phase */

  const reject_expelliarmus = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    }

    const keys = {
      vote: "nox"
    }

    const path = "http://127.0.0.1:8000/" + room_name + "/cast/expelliarmus"

    sendRequest('PUT', headers, keys, path).then(async response => {
      const data = await response.json();
      if(!response.ok){ 
        return false
      }else{
        return true
      }
    }).catch(error => {
        console.log("Ups! something went wrong.")
    })
  }
  
  const accept_expelliarmus = () => {

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    }

    const keys = {
      vote: "lumox"
    }

    const path = "http://127.0.0.1:8000/" + room_name + "/cast/expelliarmus"

    sendRequest('PUT', headers, keys, path).then(async response => {
      const data = await response.json();
      if(!response.ok){ 
        return false
      }else{
        return true
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
            <p>The director said Expelliarmus, and you?</p>
            {close => (
              <div>
              <br /><button class='login-button' onClick={()=> {close(); accept_expelliarmus()}}>¡Expelliarmus!</button>
              <br /><button class='login-button' onClick={() => {close(); reject_expelliarmus()}}>Reject</button>
              </div>
            )}
        </Popup>
      :
      null
    </div>
  )
}