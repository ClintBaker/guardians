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
          <h4>Stream music and videos together.</h4>
        </div>
        <div className="homeInfo col-md-6 col-xs-12">
          <h3 className="title2">Get Started</h3>
          <div className="row">
            <div className="col-xs-12 col-md-6 col-lg-5 col-lg-offset-1">
              <h4><a onClick={() => {
                this.handleNav('van');
              }}>Stations</a></h4>
              <p>Browse current stations.  Hop along for the ride while someone else picks the songs / videos.</p>
            </div>
            <div className="col-xs-12 col-md-6 col-lg-5">
              <h4><a onClick={() => {
                this.handleNav('browse');
              }}>Videos</a></h4>
              <p>Browse videos and music.  Search the entire YouTube catalog right here.  Stream any song, anytime, and create a station so your friends can listen too.</p>
            </div>
          </div>
          <div className="row">
          <div className="col-xs-12 col-md-6 col-lg-5 col-lg-offset-1">
            <h4><a onClick={() => {
              this.handleNav('myLibrary');
            }}>My Library</a></h4>
            <p>Save music / videos to MyLibrary simply by clicking the <span className="fa fa-plus"></span> icon next to any video,
            and always be able to access your favorite content.</p>
          </div>
            <div className="col-xs-12 col-md-6 col-lg-5">
              <h4><a onClick={() => {
                this.handleNav('users');
              }}>People</a></h4>
              <p>Find your friends and add them so you have people to share music / videos with.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xs-12 homeImageContainer">
          <img className="homeImage" src="assets/images/background2.jpeg" />
        </div>
        <div className="row col-xs-12">
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
