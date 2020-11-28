import React, { useState, useEffect } from 'react';
import '../../stylesheet/custom.css';
import { Piece } from './Piece';

/* This component will show the proclamations for each team*/
/* PROPS_NEEDED: proclam_de, proclam_op */
export const Dashboard_Test = (props) => {
    const [proclam_de, setProclamDe] = useState(0)
    const [proclam_op, setProclamOp] = useState(0)
    
    const getPieces = (img) => {
        /*var to = 0
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
        }*/
        var components = ['death', 'phoenix', 'crucio', 'empty', 'imperio', 'avada']
        return components;
    }
    return (
        <div class="container dashboard-bg">
            <div class='container px-5'>
                <div class="columns">
                    <div class='column is-12'>
                        <span class='game-title'>Death Eaters: </span>
                        <div class='columns'>
                            {
                                getPieces('death').map( (name) => 
                                    <Piece imgSrc = {name} faction='death'/>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class='column is-12'>
                        <span class='game-title'>Phoenix Order: </span>
                        <div class='columns'>
                        {
                            getPieces('phoenix').map( name =>
                                <Piece imgSrc = { name } faction='phoenix' />
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}