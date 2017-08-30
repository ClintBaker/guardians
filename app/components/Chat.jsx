import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '', videoId: '' };

    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: 'smooth' });
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

  renderMessages() {
    var { room } = this.props;
    const messages = room.messages.map((message) =>
      <li key={message.user + (Math.random() * 100)}><span style={{fontWeight: 'bold', color: message.color}}>{message.user}: </span> {message.message}</li>
    );

    return (
      <ul style={{listStyle: 'none'}}>{messages}</ul>
    );
  }

  render() {

    const chatStyle1 = {
      visibility: 'hidden'
    };

    var chatStyle = {width: '80%'};

    if (!this.props.room.id) {
      chatStyle = chatStyle1;
    }

    return (
      <div className="col-sm-4" style={{position: 'fixed', left: '70%', 'overflow-y': 'scroll', height: '85vh'}}>
        <div style={{width: '80%'}}>
            {this.renderMessages()}
            <div style={{float: 'left', clear: 'both'}} ref={(el) => { this.messagesEnd = el; }}></div>
        </div>
        <div>
          <form onSubmit={this.handleSendMessage} style={chatStyle} className="form-group">
            <input value={this.state.message} onChange={this.handleChangeMessage} className="form-control" />
            <button type="submit" className="btn btn-success">Send</button>
          </form>
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
)(Chat);
