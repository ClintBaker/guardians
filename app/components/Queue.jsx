import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class Queue extends React.Component {
  constructor(props) {
    super(props);

    this.renderQueue = this.renderQueue.bind(this);
    this.handlePlayQueue = this.handlePlayQueue.bind(this);
  }

  handleRemoveFromQueue(id) {
    this.props.dispatch(actions.removeFromQueue(id));
  }

  handlePlayQueue(id, title) {
    this.props.dispatch(actions.submitVideoid(id, title));
  }

  renderButtons(video) {
    if (this.props.room.isChief === true) {
      return (
        <div>
          <button className="btn btn-sm btn-success" onClick={() => this.handlePlayQueue(video.id, video.title)}><i className="fa fa-play"></i></button>
          <button className="btn btn-sm btn-danger" onClick={() => this.handleRemoveFromQueue(video.id)}>X</button>
        </div>
      );
    }
  }

  renderQueue() {
    const { library } = this.props;

    var number = 0;

    if (library.queue && library.queue.length > 0) {
      return library.queue.map((video) => {
        number++
        return (
          <div className="col-md-3 col-sm-6" key={(video.id + Date.now() * 100 + Math.random())}>
            <div style={{fontWeight: 'bold', height: '225px', overflow: 'scroll'}}>
              <h5><span>{number} </span>{video.title}</h5>
              <img src={video.url} />
              {this.renderButtons(video)}
            </div>
          </div>
        );
      });


      return (
        <div>
          <div>{libraryQueue}</div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h3>Queue</h3>
        {this.renderQueue()}
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
)(Queue);


// https://www.youtube.com/watch?v=qs6FJZ9Qz7o
// https://www.youtube.com/watch?v=tbxh2cWokLs
// https://www.youtube.com/watch?v=CUQADT8-JP8
// https://socket.io/docs/
