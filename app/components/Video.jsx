import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';


class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: ''};

    this.handleVideoEnd = this.handleVideoEnd.bind(this);
    this.handleNav = this.handleNav.bind(this);
    this._onReady = this._onReady.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
  }

  handleNav(comp) {
    const { dispatch } = this.props;

    dispatch(actions.updateNav(comp));
  }

  handleVideoEnd() {
    const { library, dispatch } = this.props;

    if (library.queue.length > 0) {
      dispatch(actions.submitVideoid(library.queue[0].id, library.queue[0].title));
      dispatch(actions.removeFromQueue(library.queue[0].id));
    }
  }

  _onReady(e) {

  }

  renderVideo() {

    const opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        autoplay: 1
      }
    };

    const style1 = {
      height: '70vh',
      width: '100%'
    };

    const style2 = {
      height: '150',
      width: '246',
      position: 'fixed',
      top: '75%',
      left: '3%',
      zIndex: '100'
    };

    const styleA = {
      visibility: 'hidden'
    };

    const styleB = {
      backgroundColor: '#eaeaea',
      padding: '8px'
    };

    var styleAB;

    var style;

    if (this.props.nav == 'studio') {
      style = style1;
      styleAB = styleA;
    } else {
      style = style2;
      styleAB = styleB;
    }

    if (this.props.video.id.length > 0) {
      return (
        <div style={style}>
          <div style={styleAB}>
            <a onClick={() => this.handleNav('studio')} style={{cursor: 'pointer'}}><span style={{color: 'red', cursor: 'pointer'}}>Live</span> {this.props.room.name ? this.props.room.name : ''}</a>
          </div>
          <YouTube
            videoId={this.props.video.id}
            opts={opts}
            onReady={this._onReady}
            onEnd={this.handleVideoEnd}
          />
        </div>
      );  
    }
  }

  render() {
    return (
            <div className="col-sm-8">
              {this.renderVideo()}
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
      library: state.library,
      nav: state.nav
    }
  }
)(Video);
