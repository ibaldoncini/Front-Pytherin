import React, { useState, useEffect } from 'react';
import '../custom.css';

export const Director = (props) => {
    const[name, setName] = useState('')

    useEffect(() => {
        setName(props.name)
    }, [props]);

        return(
            <div class="container align-cntr">
                <p class='panel-title'> Current Director </p>
                <span class='i-playerlist'>{name}</span>
            </div>
        )
}