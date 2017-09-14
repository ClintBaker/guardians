import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class RealVan extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      auth: state.auth,
      videoId: state.videoId,
      room: state.room
    }
  }
)(RealVan);
