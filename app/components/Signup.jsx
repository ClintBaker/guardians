import React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';

import * as actions from 'app/actions/actions';
import firebase, { firebaseRef } from 'app/firebase/';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConfirm: '',
      email: '',
      userName: '',
      userNames: []
    }

    this.onSignup = this.onSignup.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handlePasswordConfirmInput = this.handlePasswordConfirmInput.bind(this);
    this.handleUserNameInput = this.handleUserNameInput.bind(this);

    firebaseRef.child(`userReference/userNames`).once('value').then((snapshot) => {
      var userNamesObj = snapshot.val();
      var userNameArray = [];
      Object.keys(userNamesObj).map((id) => {
        var lowerCasedName = userNamesObj[id].toLowerCase();
        userNameArray.push(lowerCasedName);
      });

      this.setState({ userNames: userNameArray });
    });

  }

  onSignup() {
    const { password, passwordConfirm, email, userName, userNames } = this.state;

    if (userNames.includes(userName.toLowerCase())) {
      return alert('user name must be unique');
    }

    if (password == passwordConfirm) {
      if (email.length > 1 && userName.length > 1) {
        this.props.dispatch(actions.createUser(password, email, userName));
      } else {
        alert('must fill in each field');
      }
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

  handleUserNameInput(e) {
    this.setState({
      userName: e.target.value
    });
  }

  render() {

    return (
      <div className="container">
        <h1>Caravan</h1>
        <p>Internet together</p>
        <form>
          <div className="form-group">
            <input type="text" className="form-control" value={this.state.userName} placeholder="user name"
               onChange={this.handleUserNameInput} />
          </div>
          <div className="form-group">
            <input className="form-control" value={this.state.email} placeholder="email" value={this.state.email} onChange={this.handleEmailInput} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" value={this.state.password} placeholder="password" value={this.state.password}
              onChange={this.handlePasswordInput} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" value={this.state.passwordConfirm} placeholder="confirm password"
               onChange={this.handlePasswordConfirmInput} />
          </div>
        </form>
        <button className="btn btn-primary" onClick={this.onSignup}>Signup</button>
        <p>Already have an account?</p>
        <button className="btn"><Link to="/">Log in</Link></button>
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
)(Signup);
