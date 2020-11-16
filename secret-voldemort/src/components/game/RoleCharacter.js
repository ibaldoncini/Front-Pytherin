import React, { useEffect, useState} from 'react';
import '../../stylesheet/custom.css';
import  Phoenix  from '../../images/phoenix_order.png';
import Death_Eater from '../../images/death_eaters.jpg';
import Voldemort from '../../images/voldemort.jpg';

export const RoleCharacter = (props) => {

    const [image,setImage] = useState('')

    useEffect(()=> {
        var image = '';
        (props.role === 'Death eater') ? (image = Death_Eater) : 
        ((props.role === 'Member of the Fenix Order') ? 
        (image = Phoenix) : image = Voldemort)
        setImage(image)
    },[props])

    return(
        <div class="container align-cntr">
            <p class='panel-title is-medium'>Role/<br/>Character</p>
            <figure class="image is-128x128 fig-inline">
                <img height='128' width='128' src={image} alt="" />
            </figure>
        </div>
    )
}


/*<figure class="image is-32x32 fig-inline">
    <img height='32' width='32' src={Dean} alt="" />
</figure>*/















/*import React from 'react';
import '../custom.css';
import  Phoenix  from '../images/phoenix_order.png';
import Death_Eater from '../images/death_eaters.jpg';
import Voldemort from '../images/voldemort.jpg';
import  Dean  from '../images/dean.png';

export const RoleCharacter = (props) => {
    /*constructor(props){
        super(props)
        this.state = {
            img: ''
        }
    }
    componentWillMount(){
        console.log(this.props.role)
        var image = '';
        (this.props.role === "Death eater") ? (image = Death_Eater) 
        : ( (this.props.role === "Member of the Fenix Order") ? (image = Phoenix) 
            : (image = Voldemort)
            )
        this.setState({img: image})
    }
    
    
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
    
}*/