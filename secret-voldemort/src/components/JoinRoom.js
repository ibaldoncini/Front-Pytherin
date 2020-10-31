import React, { Component } from 'react';
import { useParams } from "react-router-dom";

/* This component allows you to join a room through a url, 
or by selecting the room from a list. */

class JoinRoom extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount()  {
    let params = this.props.match.params.room_name
    console.log(params)
  }

  render() {
    return (<p>Redirecting a join {this.props.match.params.room_name}</p>)
  }
} export default JoinRoom