import React, { useEffect, useState } from 'react';
import  Death_Eater  from '../images/death_eaters.jpg';
import Phoenix_Order from '../images/phoenix_order.png';
import None from '../images/cancel.png';
export const Piece = props => {
   
    const [img, setImg] = useState('');

    useEffect(() => {
       const card = (props.imgSrc === "death") ? Death_Eater : 
        ((props.imgSrc === 'phoenix') ? Phoenix_Order : None)

        setImg(card);
    })
  
    return (
        <figure class="image is-64x64 fig-inline">
            <img height='64' width='64' src={ img } alt="Image" />
        </figure>
    );

}