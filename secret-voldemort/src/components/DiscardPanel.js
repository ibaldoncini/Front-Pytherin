import React, { useState, useEffect, useContext } from 'react';
import '../custom.css';
import { Card } from './Card';
import { userContext } from '../user-context';
import { sendRequest } from '../services/request';

/* PROPS_NEEDED:  room_name, minister, director, phase */
export const DiscardPanel = (props) => {
    
    const context = useContext(userContext);
    const [room_name, setRoomName] = useState('');
    const [minister, setMinister] = useState('');
    const [director, setDirector] = useState('');
    const [phase, setPhase] = useState(-1);

    useEffect(() => {
        setRoomName(props.room_name);
        setMinister(props.minister);
        setDirector(props.director);
        setPhase(props.phase);
    },[props]);

    // Getting into the server for card getting
    const getCards = () => {
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer " + context.token,
            "Content-Type": "application/json"
        };
        const room = room_name;
        const path = "http://127.0.0.1:8000/" + room.toString() +"/cards";
        sendRequest('GET', headers, {}, path).then(async response => {
            const data = await response.json();
            console.log("Aca va la response perrix: " + "\n" + data.cards.json());
            if(!response.ok){ 
               alert(data.detail.toString());
            }else{ 
                return data.cards;
            }
        }).catch(error => {
            console.log("There was an error at" + path.toString());
        })
    };
    // Depending on phase and if its a minister or director will get cards (or not)
    const showCards = () => {
        var cards
        if(phase === 3 && (context.email === minister)){
            cards = getCards()
        }else if(phase === 4 && (context.email === director)){
            cards = getCards()
        }
        return cards
    };

    return(
        <div class="column align-cntr">
            Discard<br/>
            {                
                
                console.log("ACAAAA:" + showCards())
                /*showCards().map((key,index) => 
                <Card ind={index} room_name={room_name}
                        imgSrc={key} />
                ) */
            }
            
        </div>
    );
}