import React, { useContext, useEffect, useState} from 'react';
import '../custom.css';
import { userContext } from '../user-context';
import { DirectorCandidates } from './DirectorCandidates';

// room_name
// name
// phase 
// players
// last_minister
// last_director

export const Minister = (props) => {

  const [name, setName] = useState('');
  const [last_director, setLastDirector] = useState('');
  const [players, setPlayer] = useState([]);
  const [roomName, setRoomname] = useState('');
  const [phase, setPhase] = useState(-1);

  const context = useContext(userContext)

  useEffect(() => {
    setName(props.name)
    setLastDirector(props.last_director)
    setRoomname(props.room_name)
    setPlayer(props.players)
    setPhase(props.phase)
  },[props])


    return(
      <userContext.Consumer>
        {(email, token) =>
          <div class="column align-cntr">
            <p>Current minister</p><br/>
            <span>{name}</span>
            
            <div>
              { ((phase === 1) && (name === context.email)) ?  
                <DirectorCandidates 
                  room_name = {roomName}
                  user_token = {context.token}
                  players= {players} 
                  name= {name} 
                  last_director= {last_director} 
                />
                :
                <div></div>
              }
            </div>
          </div>
        }
      </userContext.Consumer>
    )
  
}
