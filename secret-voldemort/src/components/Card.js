import React from 'react';
import  Death_Eater  from '../images/death_eaters.jpg';
import Phoenix from '../images/phoenix_order.png';
import Cancel from '../images/cancel.png';
import { sendRequest } from '../services/request';
import { userContext } from '../user-context';
class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            room_name: '',
            img : '',
            index: -1
        }
        this.discard = this.discard.bind(this);
    }
    static contextType = userContext;

    componentDidMount(){
        var image = '';
        (this.props.imgSrc === 'Death Eater proclamation') ? (image = Death_Eater) : 
        ((this.props.imgSrc ==='Order of the Fenix proclamation') 
        ? (image = Phoenix) : image = Cancel)
        this.setState({
            img: image,
            index: this.props.ind,
            room_name: this.props.room_name,
            timer: null
        })
    }
    componentWillUnmount(){
        clearInterval(this.state.timer)
    }

    discard(index){
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer " + this.context.token,
            "Content-Type": "application/json"
        }
        try {
            const room = this.state.room_name;
            const path = "http://127.0.0.1:8000/" + room.toString() +"/discard"
            const keys = {
                body: {
                    card_index: index
                },
                room_name: room,
                email: this.context.email
            }
            const timerId = setInterval(sendRequest('PUT', headers, keys, path).then(async response => response.json()).then(response => {
                if(!response.ok){ 
                    alert(response.detail)
                }else{
                    alert(response.message)
                }
            }), 2000);
            this.setState({timer: timerId})
        }catch(e){
            alert("Error getting data from the current match.")
        }
    }
    
    render(){
        return (
            <figure class="image is-32x32 fig-inline">
                <img height='32' onClick={() => {this.discard(this.state.index)}} 
                width='32' src={ this.state.img } alt=""/>
            </figure>
        );
    }
} export { Card }