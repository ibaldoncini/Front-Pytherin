import React, { useContext, useState, useEffect } from 'react';
import Wand from '../../images/wand.png';
import { sendRequest } from '../../services/request';
import { userContext } from '../../user-context';
import  Phoenix  from '../../images/phoenix_order.png';
import Death_Eater from '../../images/death_eaters.jpg';
import None from '../../images/cancel.png';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../../custom.css';
import '../../popup_custom.css';

/* This component will get the cards to discard  for minister and director */

/* PROPS_NEEDED: room_name, imgSrc, ind  */

export const Crucio = (props) => {

    const context = useContext(userContext);
    const [room_name, setRoomName] = useState('')
    const [minister, setMinister] = useState('')
    const [modalText, setModalText] = useState('')
    const [player_list, setPlayerList]  = useState([])
    const [loyalty, setLoyalty] = useState(None)
    const [loyaltyText, setLoyaltyText] = useState("You should cast the spell to see the player's loyalty")
    

    useEffect(() => {
       setRoomName(props.room_name)
       setMinister(props.minister)
       setPlayerList(props.player_list)
    }, [props])

    /* A simple handle error function */
    const handleMessages = (message) => {
        let btnDivination = document.getElementById("btn-spell")
        btnDivination.click()
        let btnModal = document.getElementById("btnModalCrucio")
        setModalText(message)
        btnModal.click()
    }


    /* Function that cast the spell */
    const castCrucio = (user) => {
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer " + context.token,
            "Content-Type": "application/json"
        }
        try {
            const path = "http://127.0.0.1:8000/" + room_name + "/cast/crucio"
            const keys = {
                username: user
            }
            sendRequest('PUT', headers, keys, path).then(async response => {
                const data = await response.json();
                if(!response.ok){ 
                    handleMessages(data.detail)
                }else{
                    showLoyalty(user,data.player_loyalty) // Check the name of this thing with the backstreet boys
                }
            }).catch(error => {
                handleMessages("Ups! something went wrong.")
            })
        }catch(e){
            handleMessages("Error getting data from the current match")
        }
    }

    /* This function confirm that the loyalty was seen by the minister */ 
    const confirmCrucio = () => {
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer " + context.token,
            "Content-Type": "application/json"
        }
        try {
            const path = "http://127.0.0.1:8000/" + room_name + "/cast/confirm_crucio"
            sendRequest('PUT', headers, {}, path).then(async response => {
                const data = await response.json();
                if(!response.ok){  // nothing will be displayed if the response is ok.
                    handleMessages(data.detail)
                }
            }).catch(error => {
                handleMessages("Ups! something went wrong.")
            })
        }catch(e){
            handleMessages("Error getting data from the current match")
        }
    }
    /* This function is to set the display text and src of the loyalty */
    const showLoyalty = (username, loyalty) => { // check this one with the backstreet boys too
        setLoyaltyText("The player " + username + " is a member of the " + loyalty)
        const imgLoyalty = (loyalty === "Death eaters") ? Death_Eater : Phoenix 
        setLoyalty(imgLoyalty)
        const list = document.getElementById("list_crucio_disable")
        const buttons = document.getElementsByClassName("disable_btn_crucio")
        list.style.display = "None"
        Array.from(buttons).forEach(element => {
            element.style.display = "None"
          });
    }

    return (
            <div class="align-cntr">
                <Popup className='alert-modal' 
                trigger={<button id='btnModalCrucio' 
                style={{display:"none"}}></button>} 
                modal position='right center'>
                        <p> 
                            {modalText}
                        </p>
                </Popup>
                <Popup className='crucio-modal' 
                    trigger={
                        <button id='btn-spell' class="btn-spell">
                            <figure class="image is-64x64">
                                <img height='128' width='128' src={ Wand }
                                alt=""/>
                            </figure>
                        </button>
                    }
                     modal position='right center'
                > 
                    <div class='container has-text-centered'>
                        <div class="columns">
                            <div class="column">
                                <ul class='list_crucio_disable'>
                                    {player_list.map((player, index) =>
                                        (player !== minister) ? (
                                        <li class='i-playerlist'>{player} 
                                            <button 
                                            class='login-button disable_btn_crucio' 
                                            onClick={castCrucio(player)}>
                                            </button>
                                        </li>) : ""
                                    )}
                                </ul>
                            </div>
                            <div class="column">
                                <p class='panel-title is-medium'>{loyaltyText}</p>
                                <figure class="image is-128x128 fig-inline">
                                    <img height='128' width='128' src={loyalty} alt="" />
                                </figure>
                            </div>
                        </div>
                    </div>
                    <br /><button class='login-button' onClick={confirmCrucio}>Ready</button>
                </Popup>
            </div>
    );
}