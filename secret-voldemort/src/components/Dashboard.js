import React, { useState, useEffect, useContext } from 'react';
import '../custom.css';
import { Piece } from './Piece';

/* This component will show the proclamations for each team*/
/* PROPS_NEEDED: proclam_de, proclam_op */
export const Dashboard = (props) => {
    const [proclam_de, setProclamDe] = useState(-1)
    const [proclam_op, setProclamOp] = useState(-1)

    useEffect(() => {
        setProclamDe(props.proclam_de);
        setProclamOp(props.proclam_op);
    }, [props])

    const getPieces = (img) => {
        var to = 0
        var cantProclam = 0
        var components = [];
        if(img === 'death'){
            to = 6
            cantProclam = proclam_de - 1 
        }else {
            to = 5;
            cantProclam = proclam_op - 1
        }
        for(var i=0; i < to; i++){
            if(i <= cantProclam){
                components.push(img)
            }else{
                components.push("none")
            }
        }
        return components;
    }
    return (
        <div class="box align-cntr">
            <article class="media">
                <div class="media-center">
                    <span>Death Eaters: </span>
                    {
                        getPieces('death').map( (name) => 
                            <Piece imgSrc = {name} />
                        )
                    }
                </div>
                <div class="media-center">
                    <span>Phoenix Order: </span>
                    {
                        getPieces('phoenix').map( name =>
                            <Piece imgSrc = { name } />
                        )
                    }
                </div>
            </article>
        </div>
    )
}