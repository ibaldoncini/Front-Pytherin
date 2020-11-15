import React from 'react'
import {Route} from 'react-router-dom'
import Cookies from 'js-cookie';

/* This component allows you to generate a custom redirectable button. */
class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      namebutton: props.type,
      path: props.path,
      text: props.text,
      username: props.username,
      logout: props.logout
    }
  }

  render() {
    if (this.state.logout) {
      Cookies.remove(this.state.username)
    } else {
      return (
        <Route render={({history}) => (
          <button
            type={this.state.namebutton}
            class={this.props.style}
            onClick={() => { history.push(this.state.path) }}
          >
          {this.state.text}
          </button>
        )} />
      )
    }
  }
} export default Button;
