import React from 'react';


class Head extends React.Component {
    constructor(props) {
      super(props);
    
    }
    render() {
      return (
        <div class='hero is-large header-img'>
          <div class='hero-body'>
            <div class='container has-text-centered'>
              <h1 class='header-title is-1'>Pytherin Project</h1>
              <h2 class='header-subtitle is-3'>To play you need to be logged in</h2>
            </div>
          </div>
        </div>
      );
    }
  } export {Head};
  