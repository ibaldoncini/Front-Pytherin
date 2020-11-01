import React from 'react';
import '../custom.css';
import { sendRequest } from '../services/request';
import { userContext } from '../user-context';
import { Piece } from './Piece';
import { Vote } from './Vote';
import { Redirect } from 'react-router-dom';

class Game extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            room_name : this.props.room_name,
            players : {},
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
    }
    renderPiece(i, img){
        return (
            <Piece imgSrc ={img} value="" />
        );
    }
    render(){
        return(
            // uncomment once its connected with endpoints
            /*<userContext.Consumer>
            {({ token }) => (
              token ? */
            <div class="game-form" id='game-form'>
                <div className="game-container">
                    <h1 class="title">Partida: {this.state.room_name}</h1>
                        <div class="box align-cntr">
                                <article class="media">
                                    <div class="media-center">
                                        {this.renderPiece(0, "death")}
                                        {this.renderPiece(0, "death")}
                                        {this.renderPiece(0, "death")}
                                        {this.renderPiece(0, "death")}
                                        {this.renderPiece(0, "death")}
                                        {this.renderPiece(0, "death")}
                                    </div>
                                    <div class="media-center">
                                        {this.renderPiece(1, "phoenix")}
                                        {this.renderPiece(1, "phoenix")}
                                        {this.renderPiece(1, "phoenix")}
                                        {this.renderPiece(1, "phoenix")}
                                        {this.renderPiece(1, "phoenix")}
                                    </div>
                                </article>
                        </div>
                        <div class="columns">
                            <div class="column align-cntr">
                               Votación<br/>
                               <Vote/>
                            </div>
                            <div class="column class='align-cntr'">
                                Rol/Personaje<br/>
                                <span></span>
                            </div>
                            <div class="column class='align-cntr'">
                                Ministro actual<br/>
                                <span></span>
                            </div>
                            <div class="column class='align-cntr'">
                                Director actual<br/>
                                <span></span>
                            </div>
                            <div class="column class='align-cntr'">
                                Jugadores en partida<br/>
                            </div>
                        </div>
                </div>
            </div>
            /*:
            <Redirect to='/'/>
            )}
            </userContext.Consumer>*/
        )
    }


} export { Game }