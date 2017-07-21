import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'app/actions/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleEmailChange(event) {
    const { dispatch } = this.props;
    dispatch(actions.setEmail(event.target.value));
  }
  handlePasswordChange(event) {
    const { dispatch } = this.props;
    dispatch(actions.setPassword(event.target.value));
  }
  onSubmit() {
    const { dispatch, login } = this.props;
    console.log('submitting');
    dispatch(actions.startLogin(login));
  }
  render () {
    return (
      <div className="col-sm-offset-2 col-sm-8">
        <h1 style={{textAlign: 'center', paddingBottom: '12px'}}>Login</h1>
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="email" className="col-sm-2 control-label">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="email" value={this.props.login.email} onChange={this.handleEmailChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="col-sm-2 control-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="password" value={this.props.login.password} onChange={this.handlePasswordChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Sign in</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const styles = {
  center: {
    textAlign: 'center'
  }
};

export default Redux.connect(
  (state) => {
    return {
      login: state.login
    }
  }
)(Login);
