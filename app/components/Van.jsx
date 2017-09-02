import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class Van extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seshName: '' };

    this.handleChangeSetName = this.handleChangeSetName.bind(this);
    this.handleSpinLive = this.handleSpinLive.bind(this);

    this.props.dispatch(actions.getSessions());
  }

  handleChangeSetName(e) {
    var seshName = e.target.value;

    this.setState({ seshName });
  }

  handleSpinLive() {
    var { dispatch, auth } = this.props;
    var seshName = this.state.seshName;

    dispatch(actions.createSesh(seshName, auth.uid, auth.userName));
  }

  handleJoinRoom(id) {
    this.props.dispatch(actions.joinSesh(id));
  }

  renderSessions() {
    var { room } = this.props;

    if (room.sessions) {
      return room.sessions.map((session) => {

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
              <li><small>Hosted by:</small> {session.chiefName}</li>
              <br />
              <li><span className="fa fa-volume-up"></span> {session.videoTitle ? session.videoTitle : 'none'}</li>
            </ul>
          </div>
        );
      });
    }
  }

  render() {

    return (
      <div>
        <h1>Browse stations</h1>
        <div className="col-sm-offset-8 col-sm-4">
          <h5>Start your own station</h5>
          <input placeholder="Station name" value={this.state.seshName} onChange={this.handleChangeSetName} />
          <button className="btn btn-primary" onClick={this.handleSpinLive} >Create station</button>
        </div>

        <div>
          <h3>Recent</h3>
          {this.renderSessions()}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      auth: state.auth,
      videoId: state.videoId,
      room: state.room
    }
  }
)(Van);


// https://www.youtube.com/watch?v=qs6FJZ9Qz7o
// https://www.youtube.com/watch?v=tbxh2cWokLs
// https://www.youtube.com/watch?v=CUQADT8-JP8
// https://socket.io/docs/
