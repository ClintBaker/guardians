import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = { roomName: '' };

    this.handleChangeRoomName = this.handleChangeRoomName.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
  }

  handleCreateRoom() {
    this.props.dispatch(actions.setRoomId(this.state.roomName));
  }

  handleChangeRoomName(e) {
    var roomName = e.target.value;

    this.setState({roomName});
  }

  renderListOfRooms() {
    return (
      <div><h1>List of Rooms</h1></div>
    );
  }

  render() {
    return (
      <div>
        <input placeholder="room number" value={this.state.roomName} onChange={this.handleChangeRoomName} />
        <button className="btn" onClick={this.handleCreateRoom}>Join Room</button>
        {this.renderListOfRooms()}
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      auth: state.auth,
      videoId: state.videoId
    }
  }
)(Rooms);
