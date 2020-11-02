import React from 'react';
import '../custom.css';
class PlayersList extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return( <div class="column class='align-cntr'">
                    Players list
                    <ul>
                        {this.props.players.map((player) => {
                            return (<li>{player}</li>);
                        })}
                    </ul>
                </div>)
    }
}export { PlayersList }