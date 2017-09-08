import React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';

import * as actions from 'app/actions/actions';
import firebase, { firebaseRef } from 'app/firebase/';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConfirm: '',
      email: ''
    }

    this.onLogin = this.onLogin.bind(this);
    this.onSignup = this.onSignup.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handlePasswordConfirmInput = this.handlePasswordConfirmInput.bind(this);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.dispatch(actions.login(user.uid));
        hashHistory.push('van');
      } else {

      }
    });
  }


  onLogin() {
    const { password, passwordConfirm, email } = this.state;

    if (password == passwordConfirm) {
      this.props.dispatch(actions.startLogin(email, password));
    } else {
      alert('passwords must match');
    }

  }

  onSignup() {
    const { password, passwordConfirm, email } = this.state;

    if (password == passwordConfirm) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        console.log('signed in b');
        hashHistory.push('home');
      }).catch((e) => {
        console.log(e);
      });
    } else {
      alert('passwords must match');
    }

  }

  handleEmailInput(e) {
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordInput(e) {
    this.setState({
      password: e.target.value
    });
  }

  handlePasswordConfirmInput(e) {
    this.setState({
      passwordConfirm: e.target.value
    });
  }

  render() {

    return (
      <div className="container">
        <h1>Caravan.fm</h1>
        <form>
          <div className="form-group">
            <input className="form-control" value={this.state.email} placeholder="email" value={this.state.email} onChange={this.handleEmailInput} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" value={this.state.password} placeholder="password" value={this.state.password}
              onChange={this.handlePasswordInput} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" value={this.state.passwordConfirm} placeholder="confirm password"
              value={this.state.passwordConfirm} onChange={this.handlePasswordConfirmInput} />
          </div>
        </form>
        <button className="btn" onClick={this.onLogin}>Log in</button>
        <p style={{marginTop: '30px'}}>Need an account?</p>
        <Link to="signup" className="btn btn-primary">Sign up</Link>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      auth: state.auth,
      videoId: state.videoId
    }
  }
)(Login);
