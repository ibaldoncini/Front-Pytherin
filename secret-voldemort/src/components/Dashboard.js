import React from 'react';
import '../custom.css';
import { Piece } from './Piece';


class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.getPieces = this.getPieces.bind(this);
    }
    getPieces(img){
        var to = 0
        var cantProclam = 0
        var components = [];
        if(img === 'death'){
            to = 6
            cantProclam = this.props.proclam_de - 1
        }else {
            to = 5;
            cantProclam = this.props.proclam_op - 1
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
    render(){
        return (
            <div class="box align-cntr">
                <article class="media">
                    <div class="media-center">
                        <span>Death Eaters: </span>
                        {
                        this.getPieces('death').map( (name) => {
                            return (<Piece imgSrc = {name} />)
                        })
                        }
                    </div>
                    <div class="media-center">
                        <span>Phoenix Order: </span>
                        {
                        this.getPieces('phoenix').map( (name) =>{
                            return (<Piece imgSrc = {name } />)
                        })
                        }
                    </div>
                </article>
            </div>
        )
    }
}export { Dashboard };