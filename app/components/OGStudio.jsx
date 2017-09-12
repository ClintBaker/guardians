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
import MyLibrary from 'app/components/MyLibrary';
import Users from 'app/components/Users';
import UserProfile from 'app/components/UserProfile';
import Home from 'app/components/Home';

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
    } else if (nav == 'myLibrary') {
      return (
        <MyLibrary />
      );
    } else if (nav == 'users') {
      return (
        <Users />
      );
    } else if (nav == 'userProfile') {
      return (
        <UserProfile />
      );
    } else if (nav == 'home') {
      return (
        <Home />
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
      <div className="main">
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
        <footer>
          <h3 align="center" style={{textAlign: 'center', paddingTop: '35px'}}>Caravan.fm</h3>
          <h5 align="center" style={{textAlign: 'center'}}>Powered by YouTube</h5>
          {/* <p><a href="http://www.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1189772.htm">Images Designed by Freepik</a></p> */}


          {/* Transport graphic by <a href="http://www.flaticon.com/authors/freepik">freepik</a> from <a href="http://www.flaticon.com/">Flaticon</a>
           is licensed under <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a>.
          Check out the new logo that I created on <a href="http://logomakr.com" title="Logo Maker">LogoMaker.com</a> https://logomakr.com/5sltnB5sltnB */}
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


//rgba(255, 0, 255, 0.4)
// https://www.youtube.com/watch?v=qs6FJZ9Qz7o
// https://www.youtube.com/watch?v=tbxh2cWokLs
// https://www.youtube.com/watch?v=CUQADT8-JP8
// https://socket.io/docs/
