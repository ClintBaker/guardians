import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import YouTube from 'react-youtube';
import ReactDOM from 'react-dom';

import firebase, { firebaseRef } from 'app/firebase';
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
    this.renderChat = this.renderChat.bind(this);
    this.renderLazer = this.renderLazer.bind(this);

    firebaseRef.child(`users/${this.props.auth.uid}`).once('value').then((snapshot) => {
      var userInfo = snapshot.val();
      this.props.dispatch(actions.afterLogin(userInfo.email, userInfo.userName));
    });
  }

  renderChat() {
    if (this.props.nav == 'studio') {
      return (
        <Chat />
      );
    }
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

  renderLazer() {
    const lazerStyle = {
      position: 'fixed',
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(255, 0, 255, 0.4)'
    };

    if (this.props.lazer === 'true') {
      return (
        <div style={lazerStyle}></div>
      );
    }
  }

  render() {

    return (
      <div>
        <div>
          {this.renderLazer()}
        </div>
        <Nav />
        <div className="container-fluid" style={{marginTop: '55px'}}>
          <div className="row">
            <Video />
            {this.renderChat()}
          </div>
          {this.renderMain()}
        </div>
        <footer style={{height: '400px', backgroundColor: '#f8f8f8', marginTop: '100px'}}>
          <h3 align="center" style={{textAlign: 'center', paddingTop: '35px'}}>Caravan.fm</h3>
        </footer>
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
      nav: state.nav,
      lazer: state.lazer
    }
  }
)(OGStudio);


// https://www.youtube.com/watch?v=qs6FJZ9Qz7o
// https://www.youtube.com/watch?v=tbxh2cWokLs
// https://www.youtube.com/watch?v=CUQADT8-JP8
// https://socket.io/docs/
