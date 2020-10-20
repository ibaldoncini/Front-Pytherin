import React from 'react';


/* This function generates the button 
that displays the form to create the room. 
¡¡¡[Does not work]!!! */

function RoomCreationButton() {
    return (
        <div className="RCButton">
          <button onClick={FormCreateRoom}>Create a room</button>
        </div>
    )
} // export default RoomCreationButton;

/* This component is in charge of collecting the 
data entered by the user and sending it to the corresponding endpoint. */

class FormCreateRoom extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      room_name: '',
      no_players: 5
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeNoPlayers = this.handleChangeNoPlayers.bind(this);
    this.handleChangeRoomName = this.handleChangeRoomName.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const {room_name, no_players} = this.state;
    if (no_players && room_name) {
      alert('Creating room ' + room_name)
    } else {
      alert('Please fill in all fields correctly.')
    }
  }
  
  handleChangeNoPlayers(event) {
    const value = event.target.value;
    this.setState({
      no_players: value
    })
  }

  handleChangeRoomName(event) {
    const value = event.target.value;
    this.setState({
      room_name: value
    })
  }

  render() {
    const  {room_name, no_players} = this.state;
    return (
        <div className="FormCreateRoom">
            <h2>Creation of room</h2>
            <form name="form" onSubmit={this.handleSubmit}>
                <div className="Room_name">
                    <label htmlFor="room_name">Room name </label>
                    <input type="text" value={room_name} onChange={this.handleChangeRoomName}  name="roomName" />
                </div>
                <div className="Number_of_Players">
                    <label htmlFor="no_players">Number of players </label>
                    <input type="number" value={no_players} min='5' max='10' onChange={this.handleChangeNoPlayers}  name="noPlayers" />
                </div>
                <button onSubmit={this.handleSubmit}>Create room</button>
            </form>
        </div>
    );
  }
} export default FormCreateRoom;