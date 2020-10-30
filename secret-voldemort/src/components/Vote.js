import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

/* TODO: Need to add the list of users and polling to obtain the votes of the 
 * other players.
 * TODO: Although i need to disable or close the popup when i click one time 
 */

export const Vote = props => {

  const[vote, setVote] = useState('');
  const[alreadyVote, setAlrVote] = useState(false);
  
  const handleVote = (e) => {
    if (e.target.name === 'lumox') {
      document.getElementById('result').textContent = 'Lumox';

    } else if (e.target.name === 'nox') {
      document.getElementById('result').textContent = 'Nox';
    }
  }

  
  return(
    <div>
      <Popup trigger={<button>Vote</button>} modal position='right center'>
        {close => 
          <div>
            <h3>Vote for the porposed government</h3>
            <button name='lumox' onClick={handleVote} onClickCapture={close} >Lumox</button>
            <button name='nox' onClick={handleVote} onClickCapture={close} >Nox</button>
          </div>
        }
      </Popup>
      <p id='result'></p>
    </div>
  );
}