import React, { useContext, useState, useEffect } from 'react';
import  Death_Eater  from '../images/death_eaters.jpg';
import Phoenix from '../images/phoenix_order.png';
import Cancel from '../images/cancel.png';
import { sendRequest } from '../services/request';
import { userContext } from '../user-context';

/* This component will get the cards to discard  for minister and director */

/* PROPS_NEEDED: room_name, imgSrc, ind  */

export const Card = (props) => {

    const context = useContext(userContext);
    const [room_name, setRoomName] = useState('')
    const [imgSrc, setImgSrc] = useState('')
    const [index, setIndex] = useState(-1)

    useEffect(() => {
        var image = '';
        (props.imgSrc === 'Death Eater proclamation') ? (image = Death_Eater) : 
        ((props.imgSrc ==='Order of the Fenix proclamation') 
        ? (image = Phoenix) : image = Cancel)
       setImgSrc(props.imageSrc)
       setRoomName(props.room_name)
       setIndex(props.ind)
    }, [props])

    const discard = (index) => {
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer " + context.token,
            "Content-Type": "application/json"
        }
        try {
            const path = "http://127.0.0.1:8000/" + room_name.toString() + "/discard"
            const keys = {
                body: {
                    card_index: index
                },
                room_name: room_name,
                email: context.email
            }
            sendRequest('PUT', headers, keys, path).then(async response => {
                const data = await response.json();
                if(!response.ok){ 
                    alert(data.detail)
                }else{
                    alert(data.message)
                }
            }).catch(error => {
                alert("Ups! Something went wrong.")
            })
        }catch(e){
            alert("Error getting data from the current match.")
        }
    }

    return (
        <figure class="image is-32x32 fig-inline">
            <img height='32' onClick={() => {discard(index)}} 
            width='32' src={ imgSrc } alt=""/>
        </figure>
    );
}