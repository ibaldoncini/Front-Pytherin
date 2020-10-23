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
          <h1>Secret-voldemort</h1>
          <h2>Para jugar es necesario loguearse</h2>
        </div>
      );
    }
  } export {Head};
  