import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import YouTube from 'react-youtube';
import ReactDOM from 'react-dom';

import firebase from 'app/firebase';
import Library from 'app/components/Library';
import Queue from 'app/components/Queue';
import Search from 'app/components/Search';
import Nav from 'app/components/Nav';

class Studio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videoId: '' };

    this.handleChangeVideoId = this.handleChangeVideoId.bind(this);
    this.hanldeSubmitVideoId = this.handleSubmitVideoId.bind(this);

    if (firebase.auth().currentUser) {
      console.log(firebase.auth().currentUser);
    }
  }

  handleSubmitVideoId(e) {
    e.preventDefault();

    this.props.dispatch(actions.submitVideoid(this.state.videoId));
    this.setState({videoId: ''});
  }

  handleChangeVideoId(e) {
    var id = e.target.value;

    this.setState({videoId: id});
  }

  render() {

    return (
      <div className="container">
        <Queue />
        <form onSubmit={this.hanldeSubmitVideoId}>
          <input placeholder="Vide ID" value={this.state.videoId} onChange={this.handleChangeVideoId} />
          <button type="submit" className="btn btn-primary">Change video</button>
        </form>
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
)(Studio);


// https://www.youtube.com/watch?v=qs6FJZ9Qz7o
// https://www.youtube.com/watch?v=tbxh2cWokLs
// https://www.youtube.com/watch?v=CUQADT8-JP8
// https://socket.io/docs/
