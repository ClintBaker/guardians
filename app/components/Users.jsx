import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nav: '' };

    this.renderUsers = this.renderUsers.bind(this);
    this.renderLocal = this.renderLocal.bind(this);
    this.renderFriends = this.renderFriends.bind(this);
    this.handleUserProfile = this.handleUserProfile.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.handleLocalNav = this.handleLocalNav.bind(this);
  }

  handleLocalNav(nav) {
    this.setState({ nav });
  }

  renderFriends() {
    const { friends } = this.props;

    return friends.map((user) => {
      return (
        <div className="col-xs-12 col-sm-4 col-md-3" key={user.email}>
          <img className="thumbnail" src="https://i.ytimg.com/vi/DVkkYlQNmbc/default.jpg" />
          <h4><a onClick={() => {
            this.handleUserProfile(user.userName, user.email, user.library);
          }}>{user.userName}</a></h4>
        </div>
      );
    });
  }

  renderLocal() {
    const { nav } = this.state;

    if (nav == 'friends') {
      return (
        <div>
          <h3>Friends</h3>
          {this.renderFriends()}
        </div>
      );
    } else {
      return (
        <div>
          <h3>Users</h3>
          {this.renderUsers()}
        </div>
      );
    }
  }

  handleAddFriend(user) {
    const { dispatch } = this.props;

    dispatch(actions.startAddFriend(user));
    dispatch(actions.fireLazer());
  }

  handleUserProfile(userName, email, library) {
    const { dispatch } = this.props;

    dispatch(actions.updateNav('userProfile'));
    dispatch(actions.updateUserProfile(userName, email, library));
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(actions.getUsers());
    dispatch(actions.getFriends());
  }

  componentDidUpdate() {
    const { dispatch } = this.props;

    dispatch(actions.getFriends());
  }

  renderUsers() {
    const { dispatch, users } = this.props;

    return users.map((user) => {
      return (
        <div className="col-xs-12 col-sm-4 col-md-3" key={user.email}>
          <img className="thumbnail" src="https://i.ytimg.com/vi/DVkkYlQNmbc/default.jpg" />
          <h4><a onClick={() => {
            this.handleUserProfile(user.userName, user.email, user.library);
          }}>{user.userName}</a></h4>
          <a onClick={() => {
            this.handleAddFriend(user);
          }}><span className="fa fa-plus"></span></a>
        </div>
      );
    })
  }

  render() {
    return (
      <div>
        <ul className="list-inline" style={{textAlign: 'center'}}>
          <li><a onClick={() => {
            this.handleLocalNav('users');
          }}>All Users | </a></li>
          <li><a onClick={() => {
            this.handleLocalNav('friends');
          }}>Friends</a></li>
        </ul>
        {this.renderLocal()}
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
      users: state.users,
      friends: state.friends
    }
  }
)(Users);
