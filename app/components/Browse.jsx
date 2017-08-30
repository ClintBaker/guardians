import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Library from 'app/components/Library';
import Nav from 'app/components/Nav';

class Browse extends React.Component {
  constructor(props) {
    super(props);

    this.renderLibrary = this.renderLibrary.bind(this);
    this.handleAddToQueue = this.handleAddToQueue.bind(this);
    this.handlePlayVideo = this.handlePlayVideo.bind(this);
    this.handleSuggestVideo = this.handleSuggestVideo.bind(this);
  }

  handleSuggestVideo(id, url, title) {
    console.log(id, url, title);
  }

  handlePlayVideo(id, title, description) {
    const { dispatch } = this.props;

    dispatch(actions.submitVideoid(id, title));
  }

  handleAddToQueue(id, title, description, url) {
    const { dispatch } = this.props;

    dispatch(actions.queueVideoId(id, url, title));
  }

  renderLibrary() {
    const { library, room, auth } = this.props;
    var roomChief;

    if (room.sessions) {
      room.sessions.map((session) => {
        if (session.id == room.id) {
          roomChief = session.chief;
        }
      });
    }

    if (library.searchItems && roomChief == auth.uid) {
      return library.searchItems.map((video) => {
        return (
          <div className="col-md-4 col-sm-6 col-xs-12" key={(video.id.videoId + new Date() + Math.random() * 100)} style={{height: '300px', overflow: 'hidden'}}>
            <h4>{video.snippet.title}</h4>
            <ul className="list-inline">
              <li><button className="btn" onClick={() => {
                this.handlePlayVideo(video.id.videoId, video.snippet.title, video.snippet.description);
              }}>Play</button></li>
              <li><button className="btn" onClick={() => {
                this.handleAddToQueue(video.id.videoId, video.snippet.title, video.snippet.description, video.snippet.thumbnails.default.url);
              }}>Queue</button></li>
            </ul>

            <img src={video.snippet.thumbnails.medium.url} />
          </div>
        );
      });
    } else if (library.searchItems) {
      <div className="col-md-4 col-sm-6 col-xs-12" key={(video.id.videoId + new Date() + Math.random() * 100)} style={{height: '300px', overflow: 'hidden'}}>
        <h4>{video.snippet.title}</h4>
        <ul className="list-inline">
          <li><button className="btn" onClick={() => {
            this.handleSuggestVideo(video.id.videoId, video.snippet.thumbnails.default.url, video.snippet.title);
          }}>Suggest</button></li>
        </ul>

        <img src={video.snippet.thumbnails.medium.url} />
      </div>
    } else {
      return (
        <Library />
      );
    }
  }

  render() {

    return (
      <div>
        <Nav />
        <div className="container-fluid">

          <h1>Browse</h1>
          {this.renderLibrary()}
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
      room: state.room,
      library: state.library
    }
  }
)(Browse);


// https://www.youtube.com/watch?v=qs6FJZ9Qz7o
// https://www.youtube.com/watch?v=tbxh2cWokLs
// https://www.youtube.com/watch?v=CUQADT8-JP8
// https://socket.io/docs/
