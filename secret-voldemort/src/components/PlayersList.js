import React, { useState, useEffect } from 'react';
import '../custom.css';

export const PlayersList = (props) => {
    const [players, setPlayers] = useState([])

    useEffect(() => {
        setPlayers(props.players)
    },[props])

    return( <div class="column class='align-cntr'">
                Players list
                <ul>
                    {players.map((player) => 
                        <li>{player}</li>
                    )}
                </ul>
            </div>)
}