import React from 'react';
import '../custom.css';
import  Phoenix  from '../images/phoenix_order.png';
import  Dean  from '../images/dean.png';
class RoleCharacter extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div class="column align-cntr">
                Role/Character<br/>
                <figure class="image is-32x32 fig-inline">
                    <img height='32' width='32' src={Phoenix} alt="Image" />
                </figure>
                <figure class="image is-32x32 fig-inline">
                    <img height='32' width='32' src={Dean} alt="Image" />
                </figure>
            </div>
        )
    }
}export {RoleCharacter};