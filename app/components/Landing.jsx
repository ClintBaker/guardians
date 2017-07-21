import React from 'react';

import Login from './Login';

class Landing extends React.Component {
  render () {
    return (
      <div>
        <div className="jumbotron" style={styles.jumbotron}>
          <h1>Guardians</h1>
          <p>Gawd bless America</p>
        </div>
        <div className="container">
          <Login />
        </div>
      </div>
    )
  }
}

const styles = {
  jumbotron: {
    textAlign: 'center'
  }
};

export default Landing;
