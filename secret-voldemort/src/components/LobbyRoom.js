import React from 'react';
import { sendRequest } from '../services/request';
import { Redirect } from 'react-router-dom';
import { userContext } from '../user-context';

class LobbyRoom extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            room_name : '',
            players : ["Cargando usuarios conectados"],
            owner : '',
            timer: null
        }
        this.getGameState = this.getGameState.bind(this);
        this.handleStart = this.handleStart.bind(this);
    }
    static contextType = userContext
    getGameState(headers, path){
        try {
            const timerId = setInterval((h=headers,p=path) => {sendRequest('GET', h, {}, p).then(
                async response => {
                    if(!response.ok){ 
                        alert ("Error al obtener usuarios de la sala")
                    }else{
                        const data = await response.json()
                        const users = data.users;
                        this.setState({owner: data.owner})
                        this.setState({players: users})
                    }
                }
            ).catch(error => {
                console.error("There was an error", error) 
            })
            }, 3000);
            this.setState({timer: timerId});
        }catch(e){
            alert ("Error al obtener datos sobre los usuarios de la sala. Consulte con el soporte.")
        }
    }

    componentDidMount(){
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer " + this.context.token,
            "Content-Type": "application/json"
        }
        try{ // without this react explodes 
            const prop = this.props.history.location.state // to get props via "redirect" component
            const room = prop.room 
            const path = "http://127.0.0.1:8000/" + room.toString() + "/game_state"
            // the component will re-render every setInterval, take care...
            this.getGameState(headers,path)
            this.setState({room_name: room})
        }catch(e){
            alert("Hubo un error al procesar lo requerido por favor nuevamente desde la plataforma.")
        }
    }
    componentWillUnmount(){
        clearInterval(this.state.timer);
    }
    handleStart(){
        console.log("se empieza la partida perrito?");
    }
    render(){
        return(
            <userContext.Consumer>
            {({ token }) => (
              token ? 
            <div class="lobby-room-form">
                <div class="lobby-container">
                    <h1>Partida: {this.state.room_name}</h1>
                    <h3>Jugadores en partida</h3>
                    <ul name='players-list' id='unique-list'>
                    {this.state.players.map(item => {
                        return <li id={item}>{item}</li>;
                    })}
                    </ul>
                    <input type='button' value='Empezar partida' onClick={this.handleStart}/> 
                    <input type='button' value='Salir de partida' onClick={this.handleExit}/>
                </div>
            </div>
            :
            <Redirect to='/'/>
            )}
            </userContext.Consumer>
        )
    }
} export {LobbyRoom}