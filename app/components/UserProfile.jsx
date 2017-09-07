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
    this.renderUserLibrary = this.renderUserLibrary.bind(this);
    this.handleAddToLibrary = this.handleAddToLibrary.bind(this);
    this.handlePlayVideo = this.handlePlayVideo.bind(this);
    this.handleAddToQueue = this.handleAddToQueue.bind(this);
    this.handlePlayVideoNew = this.handlePlayVideoNew.bind(this);
    this.handleSuggestVideo = this.handleSuggestVideo.bind(this);
    this.handleLocalNav = this.handleLocalNav.bind(this);
    this.renderUserBroadcasts = this.renderUserBroadcasts.bind(this);
    this.renderUserFriends = this.renderUserFriends.bind(this);
    this.handleUserProfile = this.handleUserProfile.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
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

  renderUserFriends() {
    const { users, userInfo } = this.props;
    var userOG;

    users.map((user) => {
      if (user.userName == userInfo.userName) {
        userOG = user;
      }
    });

    if (userOG && userOG.friends) {
      var friendArr = [];
      Object.keys(userOG.friends).map((key) => {
        friendArr.push(userOG.friends[key]);
      });
      return friendArr.map((user) => {
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
      });
    }
  }

  handleSuggestVideo(id, url, title) {
    console.log(title);
  }

  handlePlayVideoNew(id, url, title) {
    const { dispatch } = this.props;

    var r = confirm('Are you sure you want to leave your current station, and create a new one?');
    if (r) {
      dispatch(actions.startPlayVideoAndCreateStation(id, url, title));
    }
  }

  handleAddToLibrary(id, url, title) {
    this.props.dispatch(actions.startAddToLibrary(id, url, title))
  }

  handleAddToQueue(id, url, title) {
    this.props.dispatch(actions.queueVideoId(id, url, title));
  }

  handlePlayVideo(id, url, title) {
    this.props.dispatch(actions.submitVideoid(id, title));
  }

  handleLocalNav(render) {
    this.setState({ render });
  }

  handleJoinRoom(id) {
    this.props.dispatch(actions.joinSesh(id));
  }

  renderUserBroadcasts() {
    var { room, userInfo } = this.props;
    var sessionsArray = [];

    if (room.sessions) {
      room.sessions.map((session) => {
        if (session.chiefName == userInfo.userName) {
          sessionsArray.push(session);
        }
      });

      return sessionsArray.map((session) => {
        var url;
        if (session.queue) {
          var array = [];
          Object.keys(session.queue).forEach((obj) => {
            array.push(obj);
          });
          url = session.queue[array[0]].url;

        } else {
          url = 'https://i.ytimg.com/vi/Qrh7Pd6Ei9M/default.jpg';
        }

        return (
          <div style={{height: '275px'}} key={session.name + (Math.random() * 100)} className="col-sm-6 col-xs-12 col-m-4 col-lg-3">
            <img className="thumbnail" src={url} />
            <ul className="list-inline">
              <li><a style={{fontWeight: 'bold', cursor: 'pointer', fontSize: '17px', fontWeight: '75'}}
                onClick={this.handleJoinRoom.bind(this, session.id)}>{session.name}</a></li>
              <br />
              <li><span className="fa fa-volume-up"></span> {session.videoTitle ? session.videoTitle : 'none'}</li>
            </ul>
          </div>
        );
      });
    }
  }

  renderInfo() {
    const { render } = this.state;

    if (render == 'broadcasts') {
      return (
        <div>
          <h3 style={{textAlign: 'center', marginBottom: '40px'}}>Broadcasts</h3>
          {this.renderUserBroadcasts()}
        </div>
      );
    } else if (render == 'friends') {
      return (
        <div>
          <h3 style={{textAlign: 'center', marginBottom: '40px'}}>Friends</h3>
          {this.renderUserFriends()}
        </div>
      );
    } else if (render == 'library') {
      return (
        <div>
          <h3 style={{textAlign: 'center', marginBottom: '40px'}}>Library</h3>
          {this.renderUserLibrary()}
        </div>
      )
    }
  }

  renderUserLibrary() {
    const { userInfo, room } = this.props;

    if (userInfo.library) {
      var libraryArray = [];
      Object.keys(userInfo.library).map((key) => {
        libraryArray.push(userInfo.library[key]);
      });
      if (room.isChief) {
        return libraryArray.map((obj) => {
          return (
            <div style={{height: '180px'}} className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={obj.id + (Math.random() * 100)}>
              <img src={obj.url} />
              <h5>{obj.title}</h5>
              <ul className="list-inline">
                <li><a onClick={() => {
                  this.handlePlayVideo(obj.id, obj.url, obj.title);
                }}><span className="fa fa-play"></span></a></li>
                <li><a onClick={() => {
                  this.handleAddToQueue(obj.id, obj.url, obj.title);
                }}>Q</a></li>
                <li><a onClick={() => {
                  this.handleAddToLibrary(obj.id, obj.url, obj.title);
                }}><span className="fa fa-plus"></span></a></li>
              </ul>
            </div>
          );
        });
      } else if (room.id) {
        return libraryArray.map((obj) => {
          return (
            <div style={{height: '180px'}} className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={obj.id + (Math.random() * 100)}>
              <img src={obj.url} />
              <h5>{obj.title}</h5>
              <ul className="list-inline">
                <li><a onClick={() => {
                  this.handlePlayVideoNew(obj.id, obj.url, obj.title);
                }}><span className="fa fa-play"></span></a></li>
                <li><a onClick={() => {
                  this.handleAddToLibrary(obj.id, obj.url, obj.title);
                }}><span className="fa fa-plus"></span></a></li>
                <li><a onClick={() => {
                  this.handleSuggestVideo(obj.id, obj.url, obj.title);
                }}>Suggest</a></li>
              </ul>
            </div>
          );
        });
      } else {
        return libraryArray.map((obj) => {
          return (
            <div style={{height: '180px'}} className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={obj.id + (Math.random() * 100)}>
              <img src={obj.url} />
              <h5>{obj.title}</h5>
              <ul className="list-inline">
                <li><a onClick={() => {
                  this.handlePlayVideoNew(obj.id, obj.url, obj.title);
                }}><span className="fa fa-play"></span></a></li>
                <li><a onClick={() => {
                  this.handleAddToLibrary(obj.id, obj.url, obj.title);
                }}><span className="fa fa-plus"></span></a></li>
              </ul>
            </div>
          );
        });
      }
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
