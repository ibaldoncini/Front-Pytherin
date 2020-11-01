import React from 'react';
import  Death_Eater  from '../images/death_eater.png';
import Phoenix_Order from '../images/phoenix_order.png';
import None from '../images/cancel.jpg';
class Piece extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            img : (props.imgSrc == "death") ? Death_Eater : ((props.imgSrc == 'phoenix') ? Phoenix_Order : None),
        }
    }
    render(){
        return (
            <figure class="image is-64x64 fig-inline">
                <img height='64' width='64' src={ this.state.img } alt="Image" />
            </figure>
        );
    }
} export { Piece }