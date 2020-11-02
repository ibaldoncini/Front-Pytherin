import React from 'react'
import {Route} from 'react-router-dom'
import Cookies from 'js-cookie';

/* This component allows you to generate a custom redirectable button. */
class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      path: props.path,
      text: props.text,
      username: props.username,
      logout: props.logout
    }
  }

  render() {
    const {path, text} = this.state
    if (this.state.logout) {
      Cookies.remove(this.state.username)
    } else {
      return (
        <Route render={({history}) => (
          <button
            type='button'
            onClick={() => { history.push(path) }}
          >
          {text}
          </button>
        )} />
      )
    }
  }
} export default Button;
