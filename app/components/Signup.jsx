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
      <div className="landingBackground">
        <div className="container landing">
          <div className="col-sm-12 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
            <h1>Caravan.fm</h1>
            <form className="form-horizontal customForm">
              <h4>Sign up</h4>
              <div className="form-group">
                <label className="control-label col-sm-2">User Name</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" value={this.state.userName} placeholder="user name" onChange={this.handleUserNameInput} />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-2">Email</label>
                <div className="col-sm-10">
                  <input className="form-control" value={this.state.email} placeholder="email" value={this.state.email} onChange={this.handleEmailInput} />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-2">Password</label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" value={this.state.password} placeholder="password" value={this.state.password}
                    onChange={this.handlePasswordInput} />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-2">Confirm Password</label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" value={this.state.passwordConfirm} placeholder="confirm password"
                    value={this.state.passwordConfirm} onChange={this.handlePasswordConfirmInput} />
                </div>
              </div>
            </form>
            <button className="btn col-sm-offset-2 col-sm-10" onClick={this.onSignup}>Sign up</button>
            <p className="col-sm-offset-2 col-sm-10 loginText">Already have an account?</p>
            <Link to="/" className="btn btn-primary col-sm-offset-2 col-sm-10">Log in</Link>
          </div>
        </div>
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
