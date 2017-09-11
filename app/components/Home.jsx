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
      <div style={{textAlign: 'center'}}>
        <div style={{backgroundColor: '#eaeaea', backgroundSize: 'cover', width: 'auto'}}>
          <h2 style={{paddingTop: '100px'}}><span style={{color: 'rgba(255, 0, 255, 1)'}}>Caravan.fm</span></h2>
          <h4>Stream music and videos together.</h4>

          <div className="row">
            <div className="col-sm-12 col-lg-offset-4 col-lg-4">
              <h4><a onClick={() => {
                this.handleNav('van');
              }}>Stations</a></h4>
              <p>Browse current stations.  Hop along for the ride while someone else picks the songs / videos.</p>
            </div>
            <div className="col-sm-12 col-lg-offset-4 col-lg-4">
              <h4><a onClick={() => {
                this.handleNav('browse');
              }}>Videos</a></h4>
              <p>Browse videos and music.  Search the entire YouTube catalog right here.  Stream any song, anytime, and create a station so your friends can listen too.</p>
            </div>
          </div>
          <div className="row" style={{paddingBottom: '100px'}}>
            <div className="col-sm-12 col-lg-offset-4 col-lg-4">
              <h4><a onClick={() => {
                this.handleNav('users');
              }}>People</a></h4>
              <p>Find your friends and add them so you have people to share music / videos with.</p>
            </div>
            <div className="col-sm-12 col-lg-offset-4 col-lg-4">
              <h4><a onClick={() => {
                this.handleNav('myLibrary');
              }}>My Library</a></h4>
              <p>Save music / videos to MyLibrary simply by clicking the <span className="fa fa-plus"></span> icon next to any video,
              and always be able to access your favorite content.</p>
            </div>
          </div>
        </div>

        <div className="row">
          <br />
          <p>To report errors, give feedback, or for graphic designers tryna work on the cheap, please contact: clintjbaker@gmail.com</p>
          <br />
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
