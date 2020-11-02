import React from 'react';
import '../custom.css';
import { Card } from './Card';
import { userContext } from '../user-context';
import { sendRequest } from '../services/request';
class DiscardPanel extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            room_name: this.props.room_name,
            minister: this.props.minister,
            director: this.props.director,
            phase: this.props.phase
        }
        this.showCards = this.showCards.bind(this)
        this.getCards = this.getCards.bind(this)
    }
    static contextType = userContext;
    getCards(min){
        var cards = []
        /*if(min){
            cards = ['Order of the Fenix proclamation','Death Eater proclamation'
            ,'Order of the Fenix proclamation']
        }else {
            cards = ['Death Eater proclamation', 'Order of the Fenix proclamation']
        }
        return cards*/
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer " + this.context.token,
            "Content-Type": "application/json"
        }
        const room = this.state.room_name
        const path = "http://127.0.0.1:8000/" + room.toString() +"/cards"
        sendRequest('GET', headers, {}, path).then(async response => {
            const data = await response
            if(!response.ok){ 
               alert(data.detail.toString())
            }else{
                cards = response
                return cards
            }
        }).catch(error => {
            console.log("There was an error at" + path.toString());
        })
    }

    showCards(min){
        //var cards = this.getCards(min);
        // add this when finished
        var cards = []
        if(this.state.phase == 3 && (this.context.email == this.state.minister)){
            cards = this.getCards(true)
        }else if(this.state.phase == 4 && (this.context.email == this.state.director)){
            cards = this.getCards(false)
        }
        return cards
    }
    
    render(){
        return(
            <div class="column align-cntr">
                Discard<br/>
                {this.showCards(true).map((key,index) => {
                    return(<Card ind={index} room_name={this.state.room_name}
                         imgSrc={key} />)
                })}
            </div>
        )
    }

} export { DiscardPanel };