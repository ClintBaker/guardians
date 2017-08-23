import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import YouTube from 'react-youtube';
import ReactDOM from 'react-dom';

import firebase from 'app/firebase';
import Library from 'app/components/Library';
import Queue from 'app/components/Queue';
import Search from 'app/components/Search';
import Nav from 'app/components/Nav';

class Studio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '', videoId: '' };

    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleChangeVideoId = this.handleChangeVideoId.bind(this);
    this.hanldeSubmitVideoId = this.handleSubmitVideoId.bind(this);
    this.handleLeaveRoom = this.handleLeaveRoom.bind(this);
    this.handleVideoEnd = this.handleVideoEnd.bind(this);

    if (firebase.auth().currentUser) {
      console.log(firebase.auth().currentUser);
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleVideoEnd() {
    const { library, dispatch } = this.props;

    if (library.queue) {
      dispatch(actions.submitVideoid(library.queue[0].id));
      dispatch(actions.removeFromQueue(library.queue[0].id));
    }
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollTop = node.scrollHeight;
  }


  handleChangeMessage(e) {
    var message = e.target.value;

    this.setState({ message });
  }

  handleSendMessage(e) {
    e.preventDefault();

    this.props.dispatch(actions.sendMessage(this.state.message, this.props.auth.uid, this.props.room.id));
    this.setState({ message: '' });
  }

  handleLeaveRoom() {
    this.props.dispatch(actions.leaveSession());
    hashHistory.push('van');
  }

  renderMessages() {
    var { room } = this.props;
    const messages = room.messages.map((message) =>
      <li key={message.user + (Math.random() * 100)}><span style={{fontWeight: 'bold', color: message.color}}>{message.user}: </span> {message.message}</li>
    );

    return (
      <ul style={{listStyle: 'none'}}>{messages}</ul>
    );
  }

  handleSubmitVideoId(e) {
    e.preventDefault();

    this.props.dispatch(actions.submitVideoid(this.state.videoId));
    this.setState({videoId: ''});
  }

  handleChangeVideoId(e) {
    var id = e.target.value;

    this.setState({videoId: id});
  }

  _onReady() {

  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <div>
        <Nav />
        <div className="container">
          <h1>Caravan Studio</h1>
          <div>
            <h3>Message the homies</h3>
            <button className="btn btn-danger" onClick={this.handleLeaveRoom}>Leave room</button>
          </div>

          <div className="row">
            <div className="col-sm-8">
              <YouTube
                videoId={this.props.videoId}
                opts={opts}
                onReady={this._onReady}
                onEnd={this.handleVideoEnd}
              />
              <Queue />
              <form onSubmit={this.hanldeSubmitVideoId}>
                <input placeholder="Vide ID" value={this.state.videoId} onChange={this.handleChangeVideoId} />
                <button type="submit" className="btn btn-primary">Change video</button>
              </form>
            </div>
            <div className="col-sm-4" style={{overflowY: 'scroll', height: '700px'}} ref={(el) => { this.messagesEnd = el; }}>
              {this.renderMessages()}
              <form onSubmit={this.handleSendMessage}>
                <input value={this.state.message} onChange={this.handleChangeMessage} />
                <button type="submit" className="btn btn-success">Send</button>
              </form>
            </div>
          </div>

          <div>
            <Library />
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
      library: state.library
    }
  }
)(Studio);


// https://www.youtube.com/watch?v=qs6FJZ9Qz7o
// https://www.youtube.com/watch?v=tbxh2cWokLs
// https://www.youtube.com/watch?v=CUQADT8-JP8
// https://socket.io/docs/
