import React from 'react';
import '../custom.css';
class Director extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div class="column align-cntr">
                Current director<br/>
                <span>{this.props.name}</span>
            </div>
        )
    }
} export { Director };