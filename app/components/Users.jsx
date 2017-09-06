import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.renderUsers = this.renderUsers.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(actions.getUsers());
  }

  renderUsers() {
    const { dispatch, users } = this.props;

    return users.map((user) => {
      return (
        <div className="col-xs-12 col-sm-4 col-md-3" key={user.email}>
          <img className="thumbnail" src="https://i.ytimg.com/vi/DVkkYlQNmbc/default.jpg" />
          <h4>{user.userName}</h4>
        </div>
      );
    })
  }

  render() {
    return (
      <div>
        <h3>Users</h3>
        {this.renderUsers()}
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      auth: state.auth,
      videoId: state.videoId,
      video: state.video,
      room: state.room,
      library: state.library,
      users: state.users
    }
  }
)(Users);
