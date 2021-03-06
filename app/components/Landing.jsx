import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';

import Rooms from './Rooms.jsx';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videoIdInput: '' }

    var socket = io();

    socket.on('newVideoId', (data) => {
      var id = data.videoId;
      this.props.dispatch(actions.startChangeVideoId(id));
    });


    this.onSignOut = this.onSignOut.bind(this);
    this.handleChangeVideoId = this.handleChangeVideoId.bind(this);
    this.onSubmitId = this.onSubmitId.bind(this);
  }

  onSubmitId() {
    const { dispatch, room } = this.props;

    var socket = io();

    // dispatch(actions.startChangeVideoId(this.state.videoIdInput));
    socket.emit('broadcastVideoId', {videoId: this.state.videoIdInput, room });
  }

  onSignOut() {
    const { dispatch } = this.props;

    dispatch(actions.startSignOut());
  }

  _onReady(event) {
    event.target.pauseVideo();
  }

  handleChangeVideoId(e) {
    const id = e.target.value;

    this.setState({ videoIdInput: id });
  }
  
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <div className="container">
        <h1>Caravan</h1>
        <p>Internet Together</p>
        <YouTube
          videoId={this.props.videoId}
          opts={opts}
          onReady={this._onReady}
        />

        <button className="btn btn-danger" onClick={this.onSignOut}>Sign out</button>
        <div>
          <form>
            <div className="form-group">
              <label>ID of Video</label>
              <input value={this.state.videoIdInput} className="formControl" onChange={this.handleChangeVideoId} />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" onClick={this.onSubmitId}>Go</button>
            </div>
          </form>
        </div>
        <Rooms />
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
)(Landing);


// https://www.youtube.com/watch?v=qs6FJZ9Qz7o
// https://www.youtube.com/watch?v=tbxh2cWokLs
// https://www.youtube.com/watch?v=CUQADT8-JP8
// https://socket.io/docs/
