import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export const RoomTag = props =>{

  const [room, chooseRoom] = useState('');
  
  const rootpath = '/joinRoom/'
  
  return (
    <div class='container'>
      {
        room === '' 
        ?
        <div class='columns align-cntr'>
          <div class='column is-6'>
            {props.room.name}
          </div>
          <div class='column is-2'>
            {props.room.active_users}/{props.room.max_players}
          </div>
          <div class='column is-4'>
            <button class='button' onClick={() => {chooseRoom(props.room.name)}}>Unirse</button>
          </div>
        </div>
        :
        <Redirect to={rootpath+room}/>
      }
      
    </div>
  );
}