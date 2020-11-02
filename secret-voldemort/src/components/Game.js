import React from 'react';
import '../custom.css';
import { sendRequest } from '../services/request';
import { userContext } from '../user-context';
import { Vote } from './Vote';
import { Dashboard } from './Dashboard';
import { Minister } from './Minister';
import { RoleCharacter } from './RoleCharacter';
import { Director } from './Director';
import { PlayersList } from './PlayersList';
import { DiscardPanel } from './DiscardPanel';
import { Redirect } from 'react-router-dom';

class Game extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            room_name : '',
            my_role : '',
            voldemort: '',
            death_eaters: [],
            player_list : [],
            de_procs: 0,
            fo_procs: 0,
            my_char: 'asjdjasd',
            minister: '',
            director : '',
            last_minister: '',
            last_director: '',
            votes: [],
            phase: -1,
            timer: null
        }
    }
    static contextType = userContext;
    // uncomment when the endpoint is done.
    componentDidMount(){
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer " + this.context.token,
            "Content-Type": "application/json"
        }
        try {
            // path for getting the game state.
            const prop = this.props.history.location.state // to get props via "redirect" component
            const room = prop.room 
            const path = "http://127.0.0.1:8000/" + room.toString() +"/game_state"
            this.setState({room_name: room})
            const timerId = setInterval(sendRequest('GET', headers, {}, path).then(async response => response.json()).then(response => {
                if(!response.ok){ 
                    alert ("Error al obtener algunos datos de la partida.")
                }else{
                   this.setState({
                        my_role: response.my_role,
                        voldemort: response.voldemort,
                        death_eaters: response.death_eaters,
                        player_list : response.player_list,
                        de_procs: response.de_procs,
                        fo_procs: response.fo_procs,
                        my_char: 'niidealoqui',
                        minister: response.minister,
                        director : response.director,
                        last_minister: response.last_minister,
                        last_director: response.last_director,
                        phase: response.phase,
                        votes: response.votes
                   })
                   console.log(this.state)
                }
            }), 2000);
            this.setState({timer: timerId})
        }catch(e){
            alert("Error al obtener datos de la partida.")
        }
    }
    componentWillUnmount(){
        clearInterval(this.state.timer);
    }
    render(){
        return(
            // uncomment once its connected with endpoints
            <userContext.Consumer>
            {({ token }) => (
              token ? 
            <div class="game-form" id='game-form'>
                <div class="game-container">
                    <h1 class="title">Partida: {this.state.room_name}</h1>
                        <Dashboard proclam_de = {this.state.de_procs} 
                        proclam_op={this.state.fo_procs} />
                        <div class="columns">
                            <div class="column align-cntr">
                               Vote<br/>
                               <Vote/>
                            </div>
                            <RoleCharacter role={this.state.my_role} 
                            charac={ this.state.my_char} />
                            <Minister name={this.state.minister} />
                            <Director name={this.state.director} />
                            <PlayersList players= {this.state.player_list} />
                        </div>
                        <div class="columns">
                            <DiscardPanel minister={this.state.minister} 
                            director={this.state.director} 
                            room_name={this.state.room_name} 
                            phase = {this.state.phase} />);
                        </div>
                </div>
            </div>
            :
            <Redirect to='/'/>
            )}
            </userContext.Consumer>
        )
    }


} export { Game }