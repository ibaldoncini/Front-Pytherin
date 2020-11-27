import React, { useState, useEffect, useContext } from 'react';
import '../../stylesheet/custom.css';
import { Card } from './Card';
import { userContext } from '../../user-context';
import { sendRequest } from '../../services/request';

/* PROPS_NEEDED:  room_name, minister, director, phase */
export const DiscardPanel = (props) => {
    
    const context = useContext(userContext);
    const [room_name, setRoomName] = useState('');
    const [minister, setMinister] = useState('');
    const [director, setDirector] = useState('');
    const [de_procs, setDEprocs] = useState('');
    const [phase, setPhase] = useState(-1);
    const [cards, setCards] = useState('');

    useEffect(() => {
        setRoomName(props.room_name);
        setMinister(props.minister);
        setDirector(props.director);
        setPhase(props.phase);
        setDEprocs(props.de_procs);
    },[props]);

    // Getting into the server for card getting
    const  getCards = () => {
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer " + context.token,
            "Content-Type": "application/json"
        };
        const room = room_name;
        const path = "http://127.0.0.1:8000/" + room.toString() +"/cards";
        sendRequest('GET', headers, {}, path).then(async response => {
            const data = await response.json();
            console.log("Aca va la response perrix: " + data.cards);
            if(!response.ok){ 
               console.log(data.detail.toString());
            }else{ 
                setCards(data.cards.toString());
            }
        }).catch(error => {
            console.log("There was an error at" + path.toString());
        })
    };
    // Depending on phase and if its a minister or director will get cards (or not)
     const showCards = async () => {
        if(phase === 3 && (context.username === minister)){
            await getCards()
            return true
        }else if(phase === 4 && (context.username === director)){
            await getCards()
            return true
        }
        return false
    };

    return(
        <div class='container align-cntr my-6 py-3'> 
            <p class='game-title align-cntr'>Discard</p>
            <div class="columns">
                {               
                    (de_procs < 5) ?
                        showCards() === false ? console.log("never")
                        :
                            cards.split(',').map((card, index) =>
                            <div class='column is-4 align-cntr'> 
                                <Card ind={index} room_name={room_name}
                                    image={card} />
                            </div>)
                    :
                    (director === context.username) ?
                        showCards() === false ? console.log("never")
                            :
                                (<div>
                                {cards.split(',').map((card, index) =>
                                    <div class='column is-4 align-cntr'> 
                                        <Card ind={index} room_name={room_name}
                                            image={card} />
                                    </div>)}
                                    <div> 
                                        <Card ind={3} room_name={room_name}/>
                                    </div>
                                </div>
                                )
                    :
                    showCards() === false ? console.log("never")
                        :
                            cards.split(',').map((card, index) =>
                            <div class='column is-4 align-cntr'> 
                                <Card ind={index} room_name={room_name}
                                    image={card} />
                            </div>)
                            
                }   
                
                
            </div>
        </div>
    );
}