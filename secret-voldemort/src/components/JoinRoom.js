import React, { Component } from 'react';
import { sendRequest } from '../services/request';
import { userContext } from '../user-context';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'

/* This component allows you to join a room through a url, 
or by selecting the room from a list. */

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      redirectPath: '',
    };
  }
  
  static contextType = userContext;


  /* Before rendering, I set the name of the room that comes in the parameters, prepare 
  the link to where the user will be redirected if he is logged in and there is room in the room. */

  componentWillMount() {

    const cookie = Cookies.getJSON("user");
    if(cookie !== undefined) {
      const link_room = "/" + this.props.match.params.room
      const authorizationToken = "Bearer " + cookie.token
  
      const headers = {
        Accept: "application/json",
        Authorization: authorizationToken,
        "Content-Type": "application/json"
      }
      const endpoint = "http://127.0.0.1:8000/room/join/" + this.props.match.params.room

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
      return (
        <div></div>
      )
    }
  }
} export default JoinRoom