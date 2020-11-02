import React from 'react';
import '../custom.css';
import  Phoenix  from '../images/phoenix_order.png';
import Death_Eater from '../images/death_eaters.jpg';
import Voldemort from '../images/voldemort.jpg';
import  Dean  from '../images/dean.png';
class RoleCharacter extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            img: ''
        }
    }
    componentDidMount(){
        var image = '';
        (this.props.role === 'Death eater') ? (image = Death_Eater) : 
        ((this.props.role ==='Member of the Fenix Order') ? 
        (image = Phoenix) : image = Voldemort)
        this.setState({img: image})
    }
    render(){
        return(
            <div class="column align-cntr">
                Role/Character<br/>
                <figure class="image is-32x32 fig-inline">
                    <img height='32' width='32' src={this.state.img} alt="" />
                </figure>
                <figure class="image is-32x32 fig-inline">
                    <img height='32' width='32' src={Dean} alt="" />
                </figure>
            </div>
        )
    }
}export {RoleCharacter};