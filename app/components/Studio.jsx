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
import Chat from 'app/components/Chat';

class Studio extends React.Component {
  constructor(props) {
    super(props);

    if (firebase.auth().currentUser) {
      console.log(firebase.auth().currentUser);
    }
  }

  render() {

    return (
      <div className="container-fluid" style={{marginTop: '30px'}}>
        <div className="col-sm-8">
          <h2>{this.props.video && this.props.video.title ? this.props.video.title : ''}</h2>
          <Queue />
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
      video: state.video,
      room: state.room,
      library: state.library
    }
  }
)(Studio);


// https://www.youtube.com/watch?v=qs6FJZ9Qz7o
// https://www.youtube.com/watch?v=tbxh2cWokLs
// https://www.youtube.com/watch?v=CUQADT8-JP8
// https://socket.io/docs/
