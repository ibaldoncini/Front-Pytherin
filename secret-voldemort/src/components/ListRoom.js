import React, { useContext, useEffect, useState }from 'react';
import { Redirect } from 'react-router-dom';
import { userContext } from '../user-context';
import Cookie from 'js-cookie';
import { sendRequest } from '../services/request';
import { RoomTag } from './RoomTag';

export const ListRoom = props => {

  const [roomList, updateRoomlist] = useState([]);

  const context = useContext(userContext);

  useEffect(() => {
    if (context.token === '') {
      const cookie = Cookie.getJSON('user');
      if (cookie !== undefined){
        context.setToken(cookie.token);
        context.setUsername(cookie.token);
        context.setEmail(cookie.email);
      }
    }
  }, [context]);

  const getRooms = () => {
    const method = "GET";
    const header = {
      Accept: "application/json",
      Authorization: "Bearer " + context.token
    }

    sendRequest(method, header, '',"http://localhost:8000/rooms")
      .then(async response => {
        const data = await response.json();
        
        if (response.ok) {
          console.log("List of rooms received");
          updateRoomlist(data.room_list);
        } else {
          console.log("Failed on obtain the list of rooms");
        }
      }).catch(error => {
        console.log("There was an error on obtain the list of rooms");
      });
  }

  return(
    <userContext.Consumer>
      {token => (
        token ? 
          <section class='list-section my-6 py-6'>
            <div class='container'>
              <button class='button' type='button' onClick={getRooms}>
                Refresh
              </button>
              <div class='column is-fullwidth'>
                {
                  <ul>
                    {
                      roomList !== [] ? roomList.map(room =>
                        <li><RoomTag room={room}/></li>
                      )
                      :
                      <div></div>
                    }
                  </ul>
                }
              </div>
            </div>
          </section>
        :
          <Redirect to='/'/>
      )}
    </userContext.Consumer>
    );
}