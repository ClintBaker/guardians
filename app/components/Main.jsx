import React from 'react';
import firebase from 'app/firebase';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import * as actions from 'actions';
import Zip from 'app/components/Zip';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);

    if (!this.props.auth.email || !this.props.auth.uid) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.props.dispatch(actions.login(user.email, user.uid));
        } else {
          hashHistory.push('/');
        }
      });
    }
  }

  onLogout(e) {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch(actions.startLogout());
  }

  render () {
    return (
      <div>
        <div className="jumbotron" style={styles.jumbotron}>
          <h1>Guardians</h1>
          <p>Main page</p>
          <a style={{float: 'right', paddingRight: '12px', cursor: 'pointer'}} onClick={this.onLogout}><h5>Logout</h5></a>
        </div>
        <Zip />
      </div>
    )
  }
}

const styles = {
  jumbotron: {
    textAlign: 'center'
  }
};

export default connect(
  (state) => {
    return {
      auth: state.auth
    }
  }
)(Main);
