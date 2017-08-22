import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class Queue extends React.Component {
  constructor(props) {
    super(props);

    this.renderQueue = this.renderQueue.bind(this);
  }

  handleRemoveFromQueue(id) {
    this.props.dispatch(actions.removeFromQueue(id));
  }

  renderQueue() {
    const { library } = this.props;

    var number = 0;

    if (library.queue && library.queue.length > 0) {
      return library.queue.map((video) => {
        number++
        return (
          <div className="col-md-3 col-sm-6" key={(video.id + Date.now() * 100 + Math.random())}>
            <button className="btn btn-small btn-danger" onClick={() => this.handleRemoveFromQueue(video.id)}>X</button>
            <div className="row">
              <h5><span style={{fontWeight: 'bold'}}>{number} </span>{video.title}</h5>
              <img src={video.url} />
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
