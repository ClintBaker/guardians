import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    
  }

  componentWillMount() {
  }

  render() {
    return (
      <div>
        <h3>My Profile</h3>
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
)(MyProfile);
