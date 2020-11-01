import React from 'react';
import '../custom.css';

class Minister extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div class="column class='align-cntr'">
                Current minister<br/>
                <span>{this.props.name}</span>
            </div>
        )
    }
} export {Minister};
