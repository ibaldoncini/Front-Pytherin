import React from 'react';

/* This component is in charge of collecting the 
data entered by the user and sending it to the corresponding endpoint. */

class FormCreateRoom extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      room_name: '',
      max_players: 5
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeMaxPlayers = this.handleChangeMaxPlayers.bind(this);
    this.handleChangeRoomName = this.handleChangeRoomName.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const {room_name, max_players} = this.state;
    if (max_players && room_name) {
      alert('Creating room ' + room_name)
    } else {
      alert('Please fill in all fields correctly.')
    }
  }
  
  handleChangeMaxPlayers(event) {
    const value = event.target.value;
    this.setState({
      max_players: value
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
    return (
        <div className="FormCreateRoom">
            <h2>Creation of room</h2>
            <form name="form" onSubmit={this.handleSubmit}>
                <div className="Room_name">
                    <label>Room name <br/>
                      <input type="text" maxLength='30' minLength='3'
                        value={this.state.room_name} min='5' max='10'
                        onChange={this.handleChangeRoomName} name="roomName"/>
                    </label> <br/>
                </div>
                <div className="Max_Players">
                    <label>Maximum number of players <br/>
                      <input type="number" value={this.state.max_players} 
                        min='5' max='10' onChange={this.handleChangeMaxPlayers} 
                        name="maxPlayers" />
                    </label> <br/>
                </div> <br/>
                <input type='submit' value='Create room'/>
            </form>
        </div>
    );
  }
} export default FormCreateRoom;