import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { render: 'broadcasts' };

    this.renderInfo = this.renderInfo.bind(this);
    this.backToUsers = this.backToUsers.bind(this);
    this.handleLocalNav = this.handleLocalNav.bind(this);
    this.renderUserLibrary = this.renderUserLibrary.bind(this);
  }

  handleLocalNav(render) {
    this.setState({ render });
  }

  renderInfo() {
    const { render } = this.state;

    if (render == 'broadcasts') {
      return (
        <div>

        </div>
      );
    } else if (render == 'friends') {
      return (
        <div>

        </div>
      );
    } else if (render == 'library') {
      return (
        <div>
          <h3>Library</h3>
          {this.renderUserLibrary()}
        </div>
      )
    }
  }

  renderUserLibrary() {
    const { userInfo } = this.props;

    if (userInfo.library) {
      var libraryArray = [];
      Object.keys(userInfo.library).map((key) => {
        libraryArray.push(userInfo.library[key]);
      });
      return libraryArray.map((obj) => {
        return (
          <div style={{height: '180px'}} className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={obj.id + (Math.random() * 100)}>
            <img src={obj.url} />
            <h5>{obj.title}</h5>
          </div>
        );
      });
    }
  }

  backToUsers() {
    const { dispatch } = this.props;

    dispatch(actions.updateNav('users'));
  }

  //renderUserBroadcasts
  //renderUserFriends

  render() {
    const { userInfo } = this.props;
    return (
      <div>
        <a onClick={this.backToUsers}>Back to users</a>
        <div style={{textAlign: 'center', marginBottom: '45px'}}>
          <ul className="list-inline">
            <li><a onClick={() => {
              this.handleLocalNav('library');
            }}>Library</a></li>
            <li><a onClick={() => {
              this.handleLocalNav('broadcasts');
            }}>Broadcasts</a></li>
            <li><a onClick={() => {
              this.handleLocalNav('friends');
            }}>Friends</a></li>
          </ul>
          <h3>{userInfo.userName ? userInfo.userName : ''}</h3>
          <img src="https://i.ytimg.com/vi/XRD9JTGEE6U/default.jpg" />
        </div>
        {this.renderInfo()}
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
      userInfo: state.userInfo
    }
  }
)(UserProfile);
