import React from 'react';
import '../custom.css';
import { userContext } from '../user-context';
import { DirectorCandidates } from './DirectorCandidates';

// room_name
// name
// phase 
// players
// last_minister
// last_director

class Minister extends React.Component{
  constructor(props){
    super(props);
  }

  static contextType = userContext;

  render(){
    return(
      <userContext.Consumer>
        {(email, token) =>
          <div class="column align-cntr">
            <p>Current minister</p><br/>
            <span>{this.props.name}</span>
            
            <div>
              {(this.props.phase === 1 && this.props.name === email) ?  
                <DirectorCandidates 
                  room_name = {this.props.room_name}
                  user_token = {token}
                  players={this.props.players} 
                  name={this.props.name} 
                  last_director={this.props.last_director} 
                />
                :
                <div></div>
              }
            </div>
          </div>
        }
      </userContext.Consumer>
    )
  }
} export {Minister};
