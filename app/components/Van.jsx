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

    dispatch(actions.createSesh(seshName, auth.uid));
  }

  handleJoinRoom(id) {
    this.props.dispatch(actions.joinSesh(id));
  }

  renderSessions() {
    var { room } = this.props;
    const sessions = room.sessions.map((session) =>
      <li key={session.name + (Math.random() * 100)}><a style={{fontWeight: 'bold', cursor: 'pointer'}} onClick={this.handleJoinRoom.bind(this, session.id)}>{session.name}: </a>{session.chief}</li>
    );

    return (
      <ul style={{listStyle: 'none'}}>{sessions}</ul>
    );
  }

  render() {

    return (
      <div className="container">
        <h1>Caravan</h1>
        <div>
          <input placeholder="sesh name" value={this.state.seshName} onChange={this.handleChangeSetName} />
          <button className="btn btn-primary" onClick={this.handleSpinLive} >Spin Live</button>
        </div>

        <div>
          <h3>Sessions</h3>
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
