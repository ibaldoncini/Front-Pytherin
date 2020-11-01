import React, { Component } from 'react';
import { sendRequest } from '../services/request';
import { userContext } from '../user-context';
import { Redirect } from 'react-router-dom';

/* This component allows you to join a room through a url, 
or by selecting the room from a list. */

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room_name: '',
      redirect: false,
      redirectPath: '',
    };
  }
  
  static contextType = userContext;

  isLoged() {
    /* We need to finish setting the cookies to verify that the user is logged in. */
    return (false)
  }

  /* Before rendering, I set the name of the room that comes in the parameters, prepare 
  the link to where the user will be redirected if he is logged in and there is room in the room. */

  componentWillMount()  {
    this.state.room_name = this.props.match.params.room
    console.log(this.state.room_name)
    const link_room = "/" + this.state.room_name
    console.log("Redirecting to " + link_room)
    const token_test = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im0ucGFsdWRpQG1pLnVuYy5lZHUuYXIiLCJ1c2VybmFtZSI6Ik1hcmlhbm8xMEBAQCIsImV4cCI6MTYwNDI1NTgxNX0.Q65KvxkeN81yswPchhwNfggxfVkdU0mC7G2RejrJzxE"
    const authorizationToken = "Bearer " + token_test

    const headers = {
      Accept: "application/json",
      Authorization: authorizationToken,
      "Content-Type": "application/json"
    }
    const endpoint = "http://127.0.0.1:8000/room/join/" + this.state.room_name
    if(this.isLoged()) {
      console.log("Enviando solicitud al endpoint" + endpoint)

      sendRequest("GET", headers, {}, endpoint)
        .then(async response => {
          const data = await response.json();

          if(!response.ok) {
            const error = (data && data.message) || response.status;
            return( 
              alert(data.detail)
            )
          }
          this.setState({redirect: true, redirectPath: link_room})

        })
        .catch(error => {
          console.error('There was an error', error);
        })
    } else {
        alert("You need to be logged in to enter the room")
        this.setState({redirect: true, redirectPath: ""})
    }
    
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={this.state.redirectPath}/>);
    } else {
      return (<p></p>)
    }
  }
} export default JoinRoom