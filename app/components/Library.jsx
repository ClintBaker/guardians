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
    this.handlePlayVideoNew = this.handlePlayVideoNew.bind(this);
    this.handleAddToQueue = this.handleAddToQueue.bind(this);
    this.handleAddToLibrary = this.handleAddToLibrary.bind(this);
  }

  handleAddToLibrary(id, url, title) {
    const { dispatch } = this.props;

    dispatch(actions.startAddToLibrary(id, url, title))
  }

  handlePlayVideoNew(id, url, title) {
    const { dispatch } = this.props;

    var r = confirm('Are you sure you want to leave your current station, and create a new one?');
    if (r) {
      dispatch(actions.startPlayVideoAndCreateStation(id, url, title));
    }
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
                  this.handlePlayVideo(video.id.videoId, video.snippet.thumbnails.default.url, video.snippet.title);
                }}>Play</button></li>
                <li><button className="btn" onClick={() => {
                  this.handleAddToQueue(video.id.videoId, vidUrl, vidTitle);
                }}>Queue</button></li>

                <li>
                  <a onClick={
                    () => {
                      this.handleAddToLibrary(video.id.videoId, video.snippet.thumbnails.default.url, vidTitle)
                    }
                  }><span className="fa fa-plus"></span></a>
                </li>
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

              <li>
                <a onClick={
                  () => {
                    this.handlePlayVideoNew(video.id.videoId, video.snippet.thumbnails.default.url, video.snippet.title);
                  }
                }><span className="fa fa-play"></span></a>
              </li>
              <li>
                <a onClick={
                  () => {
                    this.handleAddToLibrary(video.id.videoId, video.snippet.thumbnails.default.url, video.snippet.title)
                  }
                }><span className="fa fa-plus"></span></a>
              </li>
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
