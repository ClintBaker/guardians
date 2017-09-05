import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class MyLibrary extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddToQueue = this.handleAddToQueue.bind(this);
    this.handlePlayVideo = this.handlePlayVideo.bind(this);
    this.renderMyLibrary = this.renderMyLibrary.bind(this);
    this.handleSuggestVideo = this.handleSuggestVideo.bind(this);
    this.handlePlayVideoNew = this.handlePlayVideoNew.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(actions.getMyLibrary());
  }

  handlePlayVideoNew(id, url, title) {
    const { dispatch } = this.props;

    var r = confirm('Are you sure you want to leave your current station, and create a new one?');
    if (r) {
      dispatch(actions.startPlayVideoAndCreateStation(id, url, title));
    }
  }

  handleSuggestVideo(id, title) {
    console.log(`Suggesting: ${id}`);
  }

  handleAddToQueue(id, url, title) {
    const { dispatch } = this.props;

    dispatch(actions.queueVideoId(id, url, title));
  }

  handlePlayVideo(id, title, description) {
    const { dispatch } = this.props;

    dispatch(actions.submitVideoid(id, title));
  }

  renderMyLibrary() {
    const { auth, room } = this.props;

    if (auth.myLibrary && auth.myLibrary.length > 1) {
      if (room.isChief) {
        return auth.myLibrary.map((obj) => {
          const id = obj.id;
          const url = obj.url;
          const title = obj.title;

          return (
            <div key={(id + new Date() + Math.random() * 100)}>
              <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" style={{height: '300px', overflow: 'hidden'}}>
                <h4>{title}</h4>
                <ul className="list-inline">
                  <li><button className="btn" onClick={() => {
                    this.handlePlayVideo(id, title);
                  }}>Play</button></li>
                  <li><button className="btn" onClick={() => {
                    this.handleAddToQueue(id, url, title);
                  }}>Queue</button></li>
                </ul>

                <img src={url} />
              </div>
            </div>
          );
        });
      } else {
        return auth.myLibrary.map((obj) => {
          const id = obj.id;
          const url = obj.url;
          const title = obj.title;

          return (
            <div key={(id + new Date() + Math.random() * 100)}>
              <div className="col-md-4 col-sm-6 col-xs-12" style={{height: '300px', overflow: 'hidden'}}>
                <h4>{title}</h4>
                <ul className="list-inline">
                  <li><button className="btn" onClick={() => {
                    this.handleSuggestVideo(id, title);
                  }}>Suggest</button></li>
                  <li><a onClick={() => {
                    this.handlePlayVideoNew(id, url, title);
                  }}><span className="fa fa-play"></span></a></li>
                </ul>

                <img src={url} />
              </div>
            </div>
          );
        });
      }
    }
  }

  render() {
    return (
      <div>
        <h3>My Library</h3>
        {this.renderMyLibrary()}
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
)(MyLibrary);


// https://www.youtube.com/watch?v=qs6FJZ9Qz7o
// https://www.youtube.com/watch?v=tbxh2cWokLs
// https://www.youtube.com/watch?v=CUQADT8-JP8
// https://socket.io/docs/
