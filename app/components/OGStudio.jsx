import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import YouTube from 'react-youtube';
import ReactDOM from 'react-dom';

import firebase from 'app/firebase';
import Browse from 'app/components/Browse';
import Queue from 'app/components/Queue';
import Search from 'app/components/Search';
import Van from 'app/components/Van';
import Nav from 'app/components/Nav';
import Studio from 'app/components/Studio';
import Video from 'app/components/Video';
import Chat from 'app/components/Chat';

class OGStudio extends React.Component {
  constructor(props) {
    super(props);

    this.renderMain = this.renderMain.bind(this);
  }

  renderMain() {
    const { nav } = this.props;

    if (nav == 'van') {
      return (
        <Van />
      );
    } else if (nav == 'studio') {
      return (
        <Studio />
      );
    } else if (nav == 'browse') {
      return (
        <Browse />
      );
    }

  }

  render() {

    return (
      <div>
        <Nav />
        <Chat />
        <div className="container-fluid" style={{marginTop: '55px'}}>
          <Video />
          {this.renderMain()}
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
      library: state.library,
      nav: state.nav
    }
  }
)(OGStudio);


// https://www.youtube.com/watch?v=qs6FJZ9Qz7o
// https://www.youtube.com/watch?v=tbxh2cWokLs
// https://www.youtube.com/watch?v=CUQADT8-JP8
// https://socket.io/docs/
