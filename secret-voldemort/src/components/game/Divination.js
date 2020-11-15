import React, { useContext, useState, useEffect } from 'react';
import  Death_Eater  from '../../images/death_eaters.jpg';
import Phoenix from '../../images/phoenix_order.png';
import Cancel from '../../images/cancel.png';
import { sendRequest } from '../../services/request';
import { userContext } from '../../user-context';
/* This component will get the cards to discard  for minister and director */

/* PROPS_NEEDED: room_name, imgSrc, ind  */

export const Divination = (props) => {

    const context = useContext(userContext);
    const [room_name, setRoomName] = useState('')
    const [cards, setCards] = useState([])
    //const [minister, setMinister] = useState('')
    

    useEffect(() => {
       setRoomName(props.room_name)
       //setMinister(props.minister)
    }, [props])

    const castDivination = (index) => {
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer " + context.token,
            "Content-Type": "application/json"
        }
        try {
            const path = "http://127.0.0.1:8000/" + room_name + "/cast/divination"
            sendRequest('GET', headers, {}, path).then(async response => {
                const data = await response.json();
                if(!response.ok){ 
                    console.log(data.detail)
                }else{
                    setCards(data.cards)

                }
            }).catch(error => {
                console.log("Ups! Something went wrong.")
            })
        }catch(e){
            console.log("Error getting data from the current match.")
        }
    }
    return (
            <div>
                <button onClick={castDivination}></button>
                {/*(cards.length != 0) ? 
                    cards.map((card, index) =>  
                                {
                                    console.log(card);
                                    let image =  (card === 'Death Eater proclamation') ? (image = Death_Eater) : 
                                    ((card ==='Order of the Fenix proclamation') 
                                    ? (image = Phoenix) : image = Cancel);
                                    <figure class="image fig-inline-block">
                                        <img height='32' width='32' src={ image } alt=""/>;
                                    </figure>
                                }
                        )
                
                    : <p></p>
                            */}
                <button >Ready</button>
            </div>
    );
}