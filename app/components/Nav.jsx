import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Search from 'app/components/Search';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.renderRoom = this.renderRoom.bind(this);
    this.handleNav = this.handleNav.bind(this);
  }

  handleNav(comp) {
    const { dispatch } = this.props;

    dispatch(actions.updateNav(comp));
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.dispatch(actions.startSignOut());
  }

  renderRoom() {
    const { room } = this.props;

    if (room.id) {
      return (
        <li><a onClick={() => this.handleNav('studio')} style={{cursor: 'pointer'}}><span className="fa fa-volume-up" style={{color: 'red', cursor: 'pointer'}}></span> {this.props.room.name ? this.props.room.name : ''}</a></li>
      );
    } else {

    }
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top ">
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a style={{cursor: 'pointer'}} className="navbar-brand" onClick={() => this.handleNav('home')}>Caravan</a>
    </div>
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li><a style={{cursor: 'pointer'}} onClick={() => this.handleNav('van')}>Stations</a></li>
        <li><a style={{cursor: 'pointer'}} onClick={() => this.handleNav('browse')}>Videos</a></li>
        <li><a style={{cursor: 'pointer'}} onClick={() => this.handleNav('users')}>People</a></li>
      </ul>
        <Search />
      <ul className="nav navbar-nav navbar-right">
        {this.renderRoom()}
        <li><a style={{cursor: 'pointer'}} onClick={() => this.handleNav('myLibrary')}>My Library</a></li>
        <li><a style={{cursor: 'pointer'}} onClick={this.handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
</nav>
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
)(Nav);
