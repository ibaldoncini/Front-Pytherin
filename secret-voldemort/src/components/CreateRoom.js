import React from 'react';
import { sendRequest } from '../services/request';
import { Redirect } from 'react-router-dom';
import { userContext } from '../user-context';
import Button from './Button'

/* This component is in charge of collecting the 
data entered by the user and sending it to the corresponding endpoint. */

class CreateRoom extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      room_name: '',
      room_max_players: 5,
      redirect: false,
      redirectPath: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeMaxPlayers = this.handleChangeMaxPlayers.bind(this);
    this.handleChangeRoomName = this.handleChangeRoomName.bind(this);
    this.join_room = this.join_room.bind(this);
  }

  static contextType = userContext;

  // methods
  join_room(headers){
    // send request for joining the room
    sendRequest("GET", headers, {}, "http://127.0.0.1:8000/room/join/" + this.state.room_name)
    .then(async response => {
      const snd_data = await response.json()
      if(!response.ok){
        return(
          alert(snd_data.detail)
        )
      }else {
        this.setState({redirect: true, redirectPath: `/lobbyRoom/${this.state.room_name}`})
      }
      
    })
    .catch(error => {
      console.error("There was an error", error) 
    })
    // end join request
  }

  handleSubmit(e) {
    e.preventDefault()
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + this.context.token,
      "Content-Type": "application/json"
    }
    const keys = `{
              "name": "${this.state.room_name}",
              "max_players": "${this.state.room_max_players}"
            }`    
    if (this.state.room_max_players && this.state.room_name) {

      sendRequest("POST", headers, keys, "http://127.0.0.1:8000/room/new")
        .then(async response => {
          const data = await response.json();

          if(!response.ok) {
            const error = (data && data.message) || response.status;
            return(
              alert(data.detail)
            )
          }else {
            this.join_room(headers)
          } 
        })
        .catch(error => {
          console.error('There was an error', error);
        })

    } else {
      alert('Please fill in all fields correctly.')
    }
  }
  
  handleChangeMaxPlayers(event) {
    const value = event.target.value;
    this.setState({
      room_max_players: value
    })
  }

  handleChangeRoomName(event) {
    let value = event.target.value;
    value = value.replace(/[^A-Za-z1-9]/gi, "");
    
    this.setState({
      room_name: value
    })
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={{
          pathname: this.state.redirectPath,
          state: { room: this.state.room_name }
        }}
              />);
    } else {
      return (
        <userContext.Consumer>
        {({token, setToken}) => (
          token ? 
          <section class='room-bg'>
              <div class='container has-text-centered mt-6'>
                <h2 class='room-title'>Creation of room</h2>
                
                <form name="form" onSubmit={this.handleSubmit}>
                    <div class="field">
                        <label class='room-label'>Room name </label>
                        <div class='column is-4 is-offset-4'>
                          <input class='room-input is-medium' type="text" maxLength='30' minLength='6'
                            value={this.state.room_name} min='5' max='10'
                            onChange={this.handleChangeRoomName} name="roomName"/>
                        </div>
                    </div>
                    <div class="field">
                        <label class='room-label'>Maximum number of players </label>
                          <div class='column is-2 is-offset-5'>
                            <input class='room-input' type="number" value={this.state.room_max_players} 
                              min='3' max='10' onChange={this.handleChangeMaxPlayers} 
                              name="maxPlayers" />
                          </div>
                    </div> 
                    <input class='room-button mx-2 my-2' type='submit' value='Create room'/>
                    <Button style='room-button mx-2 my-2' path="/home" text="Cancel"></Button>
                </form>
              </div>
          </section>
          :
          <Redirect to='/'/>
        )}
        </userContext.Consumer>
      )
    }
  }
} export default CreateRoom;