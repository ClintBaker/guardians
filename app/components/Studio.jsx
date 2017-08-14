import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';

class Studio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };

    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  handleChangeMessage(e) {
    var message = e.target.value;

    this.setState({ message });
  }

  handleSendMessage() {

    this.props.dispatch(actions.sendMessage(this.state.message, this.props.auth.uid, this.props.room.id));
    this.setState({ message: '' });
  };

  renderMessages() {
    var { room } = this.props;
    const messages = room.messages.map((message) =>
      <li key={message.user + (Math.random() * 100)}><span style={{fontWeight: 'bold'}}>{message.user}: </span>{message.message}</li>
    );

    return (
      <ul style={{listStyle: 'none'}}>{messages}</ul>
    );
  }

  render() {

    return (
      <div className="container">
        <h1>Caravan Studio</h1>
        <div>
          <h3>Message the homies</h3>
          <input value={this.state.message} onChange={this.handleChangeMessage} />
          <button className="btn btn-success" onClick={this.handleSendMessage}>Send</button>
        </div>

        <div>
          {this.renderMessages()}
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
      room: state.room
    }
  }
)(Studio);


// https://www.youtube.com/watch?v=qs6FJZ9Qz7o
// https://www.youtube.com/watch?v=tbxh2cWokLs
// https://www.youtube.com/watch?v=CUQADT8-JP8
// https://socket.io/docs/
