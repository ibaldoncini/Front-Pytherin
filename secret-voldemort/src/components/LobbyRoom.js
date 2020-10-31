import React from 'react';
import { sendRequest } from '../services/request';
import { Redirect } from 'react-router-dom';
import { userContext } from '../user-context';

class LobbyRoom extends React.Component{
    constructor(props){
        super(props)
        this. state = {
            room_name : this.props.room_name,
            players : {},
            timer: null
        }
    }
    static contextType = userContext
    componentDidMount(){
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer " + this.context.token,
            "Content-Type": "application/json"
        }
        const path = "http://127.0.0.1:8000/room/get_players"
        // the component will re-render every setInterval, take care...
        this.state.timer = setInterval(sendRequest('GET', headers, {}, path).then(response => {
            if(!response.ok){ 
                alert ("Error al obtener usuarios de la sala")
            }else{
                console.log("Accediendo al endpoint")
            }
        }), 3000)
    }

    componentWillUnmount(){
        this.state.timer = null
    }
    render(){
        return(
            <userContext.Consumer>
            {({ token }) => (
              token ? 
            <div className="lobby-room-form">
                <div className="lobby-container">
                    <h1>Partida: {this.state.room_name}</h1>
                    <h3>Jugadores en partida</h3>
                    <ul id='players-list'>
                        <li>No hay ninguno por el momento.</li>
                    </ul>
                </div>
            </div>
            :
            <Redirect to='/'/>
            )}
            </userContext.Consumer>
        )
    }
} export {LobbyRoom}