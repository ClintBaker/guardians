import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class Library extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(actions.getPopularVideos());
    this.handleSuggestVideo = this.handleSuggestVideo.bind(this);
    this.handlePlayVideo = this.handlePlayVideo.bind(this);
    this.handleAddToQueue = this.handleAddToQueue.bind(this);
  }

  handlePlayVideo(id, url, title) {
    const { dispatch } = this.props;

    dispatch(actions.submitVideoid(id, title));
  }

  handleAddToQueue(id, url, title) {
    const { dispatch } = this.props;

    dispatch(actions.queueVideoId(id, url, title));
  }

  handleSuggestVideo(id, url, title) {
    console.log(title);
  }

  renderVideos() {
    const { library, room, auth } = this.props;

    const isChief = room.isChief;

    if(library.videos && isChief) {
        return library.videos.map((video) => {
          const videoId = video.id;
          const vidUrl = video.snippet.thumbnails.default.url;
          const vidTitle = video.snippet.title;
          return (
            <div className="col-md-4 col-sm-6 col-xs-12" key={(video.id.videoId + new Date() + Math.random() * 100)} style={{height: '300px', overflow: 'hidden'}}>
              <h4>{video.snippet.title}</h4>
              <ul className="list-inline">
                <li><button className="btn" onClick={() => {
                  this.handlePlayVideo(video.id, video.snippet.thumbnails.default.url, video.snippet.title);
                }}>Play</button></li>
                <li><button className="btn" onClick={() => {
                  this.handleAddToQueue(videoId, vidUrl, vidTitle);
                }}>Queue</button></li>
              </ul>

              <img src={video.snippet.thumbnails.medium.url} />
            </div>
          );
        });
    } else if (library.videos) {
      return library.videos.map((video) => {
        return (
          <div className="col-md-4 col-sm-6 col-xs-12" key={(video.id.videoId + new Date() + Math.random() * 100)} style={{height: '300px', overflow: 'hidden'}}>
            <h4>{video.snippet.title}</h4>
            <ul className="list-inline">
              <li><button className="btn" onClick={() => {
                this.handleSuggestVideo(video.id.videoId, video.snippet.thumbnails.default.url, video.snippet.title);
              }}>Suggest</button></li>
            </ul>

            <img src={video.snippet.thumbnails.medium.url} />
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Popular Videos</h2>
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
