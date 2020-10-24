import React from 'react'
import {Route} from 'react-router-dom'

/* This component allows you to generate a custom redirectable button. */
class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      path: props.path,
      text: props.text
    }
  }

  render() {
    const {path, text} = this.state
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
} export default Button;
