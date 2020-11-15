import React from 'react';
import { sendRequest } from '../services/request';
import { Redirect } from 'react-router-dom';
import { userContext } from '../user-context';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../custom.css';
import '../popup_custom.css';

class LobbyRoom extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            room_name : this.props.match.params.room,
            players : ["Cargando usuarios conectados"],
            owner : '',
            start: false,
            redirectPath: '/gameRoom/' + this.props.match.params.room,
            timer: null,
            modalText: ''
        }
        this.getGameState = this.getGameState.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
    }


    static contextType = userContext

    handleErrors(detail){
        this.setState({ modalText: detail })
        let btnModal = document.getElementById("btnModal")
        btnModal.click()
    }

    getGameState(headers, path){
        try {
            const timerId = setInterval((h=headers,p=path) => {sendRequest('GET', h, {}, p).then(
                async response => {
                    if(!response.ok){ 
                        this.handleErrors(response.detail)
                    }else{
                        const data = await response.json()
                        if(data.room_status === "In game") {
                            this.setState({start: true})
                        }
                        const users = data.users;
                        this.setState({owner: data.owner})
                        this.setState({players: users})
                    }
                }
            ).catch(error => {
                console.error("There was an error", error) 
            })
            }, 2000);
            this.setState({timer: timerId});
        }catch(e){
            this.handleErrors("Error obtaining users data. Please ask for the support team")
        }
    }


    componentWillMount(){
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer " + this.context.token,
            "Content-Type": "application/json"
        }
        try{ // without this react explodes 
            const room = this.props.match.params.room // to get props via "redirect" component 
            const path = "http://127.0.0.1:8000/" + room + "/game_state"
            // the component will re-render every setInterval, take care...
            this.getGameState(headers,path)
        }catch(e){
            this.handleErrors("There was an error processing the data, please try again from the platform.")
        }
    }


    componentWillUnmount(){
        clearInterval(this.state.timer);
    }


    handleStart(){
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer " + this.context.token,
            "Content-Type": "application/json"
        }
        const room = this.state.room_name
        const path = "http://127.0.0.1:8000/" + room.toString() + "/start";
        sendRequest("PUT", headers, {}, path).then(async response => {
            const data = await response.json()
            if(!response.ok){ 
                this.handleErrors(data.detail)
            }else{
                this.setState({start: true})
            }
        }).catch(error => {
            this.handleErrors("There was an error at" + path.toString())
        })
    }


    render(){
        
        return(
            <userContext.Consumer>
            {({ token }) => (
            token ? (this.state.start ? (<Redirect to={{
                pathname: this.state.redirectPath,
                state: { room: this.state.room_name }
            }}
                />) :
            (<section>
                <div class="container room-bg my-6 py-6">
                    <Popup className='alert-modal' trigger={<button id='btnModal' style={{display:"none"}}></button>} modal position='right center'>
                        <p>
                            {this.state.modalText}
                        </p>
                    </Popup>
                    <div class='container has-text-centered'>
                        <h2 class='room-title'>Lobby</h2>
                    </div>
                    <div class='columns py-6'>
                        <div class='column is-4'>
                            <div class='room-card'>
                                <div class='card-header'>
                                    <h3 class='card-header-title is-centered'>Players in room</h3>
                                </div>
                                <div class='card-content is-centered'>
                                    <ul name='players-list' id='unique-list'>
                                    {this.state.players.map(item => {
                                        return <li class='i-playerlist' id={item}>{item}</li>;
                                    })}
                                    </ul>
                                </div>   
                            </div>
                        </div>
                        <div class='column is-4 has-text-centered'>
                            <h1 class='room-title'> {this.state.room_name} </h1> 
                        </div>
                        <div class='column is-4'>
                            {(this.context.email === this.state.owner) ? 
                                <input class='room-button is-fullwidth my-2 is-rounded' type='button' value='Empezar partida' onClick={this.handleStart}/> 
                            :   
                                ""
                            }
                            <input class='room-button is-fullwidth my-2 is-rounded' type='button' value='Salir de partida' onClick={this.handleExit}/>
                        </div>
                    </div>
                </div>
            </section>))
            :
            <Redirect to='/'/>
            )}
            </userContext.Consumer>
        )
    }
    
} export {LobbyRoom}