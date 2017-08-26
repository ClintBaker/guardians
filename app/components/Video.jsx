import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';


class Video extends React.Component {
  constructor(props) {
    super(props);

    this.handleVideoEnd = this.handleVideoEnd.bind(this);
    this.handleNav = this.handleNav.bind(this);
  }

  handleNav(comp) {
    const { dispatch } = this.props;

    dispatch(actions.updateNav(comp));
  }

  handleVideoEnd() {
    const { library, dispatch } = this.props;

    if (library.queue.length > 0) {
      dispatch(actions.submitVideoid(library.queue[0].id));
      dispatch(actions.removeFromQueue(library.queue[0].id));
    }
  }

  _onReady(e) {

  }

  render() {
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        autoplay: 1
      }
    };

    const style1 = {
      height: '390',
      width: '640'
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

    return (
      <div>
        <h1>Video</h1>
          <div className="container">
            <div className="col-sm-8" style={style}>
              <div style={styleAB}>
                <a onClick={() => this.handleNav('studio')} style={{cursor: 'pointer'}}><span style={{color: 'red', cursor: 'pointer'}}>Live</span> {this.props.room.name ? this.props.room.name : ''}</a>
              </div>
              <YouTube
                videoId={this.props.videoId}
                opts={opts}
                onReady={this._onReady}
                onEnd={this.handleVideoEnd}
              />
            </div>
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
)(Video);
