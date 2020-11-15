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
import { VotesList } from './VotesList';


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
            timer: null,
            redirect: false,
            redirectPath: '',
        }

        this.update = this.update.bind(this)
    }
    static contextType = userContext;
    // uncomment when the endpoint is done.


    update(headers, room, path) {

     sendRequest('GET', headers, {}, path)
        .then(async response => {const data = await response.json()
        
          console.log(data)
          if(!response.ok) { 
            alert ("Error al obtener algunos datos de la partida.")
          } else {
              console.log("Status game: " + data)
              if(data.phase !== 5 && data.phase !== 6) {
                this.setState({
                  room_name: room,
                  my_role: data.my_role,
                  voldemort: data.voldemort,
                  death_eaters: data.death_eaters,
                  player_list : data.player_list,
                  de_procs: data.de_procs,
                  fo_procs: data.fo_procs,
                  my_char: 'niidealoqui',
                  minister: data.minister,
                  director : data.director,
                  last_minister: data.last_minister,
                  last_director: data.last_director,
                  phase: data.phase,
                  votes: data.votes,
                })
              } else {
                  if (data.phase === 5) {
                    alert("The game is over. The team Death Eater won. Redirecting to the home page.")
                    this.setState({redirect: true, redirectPath: '/home'})
                  } else {
                    alert("The game is over. The team Fenix Order won. Redirecting to the home page.")
                    this.setState({redirect: true, redirectPath: '/home'})
                  }
              }
              console.log("Contexto actual: " + this.state.minister)
          }
        })
    }

    componentDidMount(){
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer " + this.context.token,
            "Content-Type": "application/json"
        }
        try {
            // path for getting the game state.
            const room = this.props.match.params.room
            const path = "http://127.0.0.1:8000/" + room.toString() +"/game_state"
            const timer = setInterval(()=> this.update(headers, room, path), 1000);
            this.setState({timer: timer})
        }catch(e){
            alert("Error al obtener datos de la partida.")
        }
    }

    
    componentWillUnmount(){
        clearInterval(this.state.timer);
    }


    render(){
      if(this.state.redirect) {
        return (<Redirect to={this.state.redirectPath}/>);
      } else {
        return(
            // uncomment once its connected with endpoints
          <userContext.Consumer>
            {({ token }) => (
              token ? 
              <section id='game-form'>
                  <div class="container my-6">
                      <h1 class="game-title is-large"> {this.state.room_name}</h1>
                          <Dashboard proclam_de = {this.state.de_procs} 
                          proclam_op={this.state.fo_procs} />
                  </div>
                  <div class='container panel-bg'> 
                    <div class="columns">
                        <div class="column is-3 ">
                          <div class='container align-cntr'>
                            <p class='panel-title'> Vote </p>
                            { this.state.phase === 2 ? 
                              <div class='container'>
                                  <Vote room_name={this.state.room_name}/>
                                  <VotesList usersVotes={this.state.votes}/>
                              </div>
                            :
                              <div></div>
                            }
                          </div>
                        </div>
                        <div class="column is-2">
                          <RoleCharacter role={this.state.my_role} charac={ this.state.myChar} />
                        </div>
                        <div class="column is-2 ">
                          <Minister
                            room_name={this.state.room_name} 
                            mail_context={this.context.email}
                            name={this.state.minister} 
                            phase={this.state.phase} 
                            players={this.state.player_list}
                            last_minister={this.state.last_minister}
                            last_director={this.state.last_director}/>
                        </div>
                        <div class="column is-2">
                            <Director name={this.state.director} />
                        </div>
                        <div class='column is-3'> 
                          <PlayersList players= {this.state.player_list} />
                        </div>
                    </div>
                  </div>
                  <div class='container align-cntr'>   
                    {((this.state.phase === 3 && this.state.minister === this.context.email) 
                      || (this.state.phase === 4 && this.state.director === this.context.email)) 
                      ? <DiscardPanel minister={this.state.minister} 
                        director={this.state.director} 
                        room_name={this.state.room_name} 
                        phase = {this.state.phase} /> 
                      :
                      <div></div>
                    }
                  </div>    
              </section>
              :
                <Redirect to='/'/>
            )}
          </userContext.Consumer>
        )
      } 
    }


} export { Game }