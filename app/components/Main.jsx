import React from 'react';
import firebase from 'app/firebase';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import * as actions from 'actions';

class Main extends React.Component {
  constructor(props) {
    super(props);

    if (!this.props.auth) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.props.dispatch(actions.login(user.email, user.uid));
        } else {
          hashHistory.push('/');
        }
      });
    }
  }
  render () {
    return (
      <div>
        <div className="jumbotron" style={styles.jumbotron}>
          <h1>Guardians</h1>
          <p>Main page</p>
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

export default connect()(Main);
