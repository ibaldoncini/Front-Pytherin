import React, { useState, useEffect } from 'react';
import '../custom.css';

export const Director = (props) => {
    const[name, setName] = useState('')

    useEffect(() => {
        setName(props.name)
    }, [props]);

        return(
            <div class="column align-cntr">
                Current director<br/>
                <span>{name}</span>
            </div>
        )
}