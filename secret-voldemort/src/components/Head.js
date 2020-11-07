import React from 'react';


class Head extends React.Component {
    constructor(props) {
      super(props);
    
    }
    render() {
      return (
        <div class='hero is-large bg-img'>
          <div class='hero-body'>
            <div class='container has-text-centered'>
              <h1 class='title is-1'>Pytherin Project</h1>
              <h2 class='subtitle is-3'>To play you need to be logged in</h2>
            </div>
          </div>
        </div>
      );
    }
  } export {Head};
  