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
//import { Discard } from './Discard';
import { Redirect } from 'react-router-dom';
import { VotesList } from './VotesList';

class Game extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            room_name : '',
            my_role : '',
            voldemort: '',
            death_eaters: [],
            player_list : ['nacho', 'esteban', 'shuls', 'mariano', 'naza', 'jero'],
            de_procs: 0,
            fo_procs: 0,
            my_char: 'asjdjasd',
            curr_minister: 'jero',
            director : '',
            last_minister: 'nacho',
            last_director: 'esteban',
            phase: 1,
            timer: null,
            votes: [{user:'nacho', vote:'Lumos'}, {user:'mariano', vote: 'Nox'}]
        }
        
    }
    static contextType = userContext;
    // uncomment when the endpoint is done.
    /*componentDidMount(){
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer " + this.context.token,
            "Content-Type": "application/json"
        }
        try {
            // path for getting the game state.
            const path = "http://127.0.0.1:8000/" + this.state.room_name.toString() +"/game_state"
            const timerId = setInterval(sendRequest('GET', headers, {}, path).then(response => {
                if(!response.ok){ 
                    alert ("Error al obtener datos de la partida.")
                }else{
                    console.log("Accediendo al endpoint de la partida perrix")
                }
            }), 3000);
            this.setState({timer: timerId})
        }catch(e){
            alert("Error al obtener datos de la partida.")
        }
    }
    componentWillUnmount(){
        clearInterval(this.state.timer);
    }*/
    render(){
        return(
            // uncomment once its connected with endpoints
            /*<userContext.Consumer>
            {({ token }) => (
              token ? */
            <div class="game-form" id='game-form'>
                <div class="game-container">
                    <h1 class="title">Partida: {this.state.room_name}</h1>
                    <Dashboard proclam_de = {this.state.proclam_de} 
                        proclam_op={this.state.proclam_op} />
                    <div class="columns">
                        <div class="column align-cntr">
                            Vote
                            <br/>
                            {this.state.phase === 2 ? 
                                <div>
                                    <Vote room_name={this.state.room_name}/>
                                    <VotesList usersVotes={this.state.votes}/>
                                </div>
                                :
                                <div></div>
                            }
                        </div>
                        <div class="column align-cntr">
                            <RoleCharacter role={this.state.myRole} charac={ this.state.myChar} />
                        </div>
                        <div class="column align-cntr">
                            <Minister
                                room_name={this.state.room_name} 
                                name={this.state.curr_minister} 
                                phase={this.state.phase} 
                                players={this.state.player_list}
                                last_minister={this.state.last_minister}
                                last_director={this.state.last_director}/>
                        </div>
                        <div class="column align-cntr">
                            <Director name={this.state.curr_director} />
                        </div>
                        <div class="column align-cntr">
                            <PlayersList players= {this.state.player_list} />
                        </div>
                        <div class="columns"></div>
                    </div>
                </div>
            </div>

            /*<Redirect to='/'/>    
            </userContext.Consumer>*/
        )
    }


} export { Game }