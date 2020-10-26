import React from 'react';


class Head extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        syle: ''
      }
    }
    render() {
      return (
        <div className={this.state.syle}>
          <h1>Pytherin Project</h1>
          <h2>To play you need to be logged in</h2>
        </div>
      );
    }
  } export {Head};
  