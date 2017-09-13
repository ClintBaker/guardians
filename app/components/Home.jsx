import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { firebaseRef } from 'app/firebase';

class Home extends React.Component {
  constructor(props) {
    super(props);

    firebaseRef.child(`users/${this.props.auth.uid}`).once('value').then((snapshot) => {
      var userInfo = snapshot.val();
      this.props.dispatch(actions.afterLogin(userInfo.email, userInfo.userName));
    });

    this.handleNav = this.handleNav.bind(this);
    this.props.dispatch(actions.getSessions());
  }

  handleNav(comp) {
    const { dispatch } = this.props;

    dispatch(actions.updateNav(comp));
  }

  render() {

    return (
      <div className="home">
        <div className="homeLanding">
          <h2><span className="title">Caravan.fm</span></h2>
          <h4>Stream music together.</h4>
        </div>
        <div className="homeInfo col-md-6 col-xs-12">
          <h3 className="title2">Get Started</h3>
          <div className="row">
            <div className="col-xs-12 col-md-6 col-lg-5 col-lg-offset-1">
              <h4><a onClick={() => {
                this.handleNav('van');
              }}>Caravan</a></h4>
              <p>Hop along for the ride while someone else picks the tracks.  Join the caravan, sit back, and find new music.</p>
            </div>
            <div className="col-xs-12 col-md-6 col-lg-5">
              <h4><a onClick={() => {
                this.handleNav('browse');
              }}>Explore</a></h4>
              <p>Search the entire YouTube catalog right here.  Stream any song or video, anytime.</p>
            </div>
          </div>
          <div className="row">
          <div className="col-xs-12 col-md-6 col-lg-5 col-lg-offset-1">
            <h4><a onClick={() => {
              this.handleNav('myLibrary');
            }}>My Library</a></h4>
            <p>Save your favorite content and listen anytime.  Playlists coming soon.</p>
          </div>
            <div className="col-xs-12 col-md-6 col-lg-5">
              <h4><a onClick={() => {
                this.handleNav('users');
              }}>People</a></h4>
              <p>Find your friends / anyone with good taste in music.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xs-12 homeImageContainer">
          <img className="homeImage" src="assets/images/background2.jpeg" />
        </div>
        <div className="row col-xs-12 homeApps">
          <h4>iOS and Andriod apps coming soon.</h4>
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
      nav: state.nav,
      lazer: state.lazer
    }
  }
)(Home);


// https://www.youtube.com/watch?v=qs6FJZ9Qz7o
// https://www.youtube.com/watch?v=tbxh2cWokLs
// https://www.youtube.com/watch?v=CUQADT8-JP8
// https://socket.io/docs/
