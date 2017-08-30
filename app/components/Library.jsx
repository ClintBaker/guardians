import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class Library extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(actions.getPopularVideos());
  }

  handleButton1(id, isChief, title, description) {
    const { dispatch } = this.props;

    if (isChief) {
      dispatch(actions.submitVideoid(id, title));
    } else if (!isChief) {
      // dispatch(actions.suggestVideoId(id));
    }
  }

  submitButton2(id, url, title, description) {
    const { dispatch } = this.props;

    dispatch(actions.queueVideoId(id, url, title));
  }

  renderVideos() {
    const { library, room, auth } = this.props;
    var roomChief;
    var isChief;
    var buttonText;
    var buttonFunc;
    var buttonText2;
    var buttonFunc2;
    var button2Hidden;

    if (room.sessions) {
      room.sessions.map((session) => {
        if (session.id == room.id) {
          roomChief = session.chief;
        }
      });
    }

    if (auth.uid == roomChief) {
      isChief = true;
      buttonText = 'Play Video';
      buttonText2 = 'Queue Video';
      button2Hidden = false;
    } else {
      isChief = false;
      buttonText = 'Suggest',
      button2Hidden = true;
    }

    if(library.videos != undefined) {

        const videos = library.videos.map((video) =>
            <div ref={video.id.videoId} key={video.id.videoId} className="col-sm-6 col-md-4"
              style={{height: '300px', border: '1px black solid', backgroundColor: '#eaeaea', overflow: 'scroll'}}
            >

              <h3>{video.snippet.title}</h3>
              <img style={{width: 'auto', height: video.snippet.thumbnails.default.height}} src={video.snippet.thumbnails.default.url} />
              <p>{video.snippet.description}</p>
              <span><small>{video.snippet.publishedAt}</small></span>
              <button onClick={() => this.handleButton1(video.id.videoId, isChief, video.snippet.title, video.snippet.description)} className="btn">{buttonText}</button>
              <button onClick={() => this.submitButton2(video.id.videoId, video.snippet.thumbnails.default.url, video.snippet.title, video.snippet.description)} className="btn" style={{visibility: button2Hidden}}>{buttonText2 ? buttonText2 : 'none'}</button>
            </div>
          );
        return (
          <div>{videos}</div>
        );
    }
  }

  render() {
    return (
      <div>
        <h2>Search for content</h2>
        {this.renderVideos()}
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
)(Library);


// https://www.youtube.com/watch?v=qs6FJZ9Qz7o
// https://www.youtube.com/watch?v=tbxh2cWokLs
// https://www.youtube.com/watch?v=CUQADT8-JP8
// https://socket.io/docs/
