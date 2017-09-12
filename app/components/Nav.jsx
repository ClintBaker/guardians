import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

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
      <nav className="navbar navbar-fixed-top ">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand navbarLink" onClick={() => this.handleNav('home')}>Caravan.fm</a>
          </div>
          <div className="customNav">
            <ul className="nav navbar-nav">
              <li><a className="navbarLink" onClick={() => this.handleNav('van')}>Stations</a></li>
              <li><a className="navbarLink" onClick={() => this.handleNav('browse')}>Videos</a></li>
              <li><a className="navbarLink" onClick={() => this.handleNav('users')}>People</a></li>
            </ul>
              <Search />
            <ul className="nav navbar-nav navbar-right">
              {this.renderRoom()}
              <li><a className="navbarLink" onClick={() => this.handleNav('myLibrary')}>My Library</a></li>
              <li><a className="navbarLink" onClick={this.handleLogout}>Logout</a></li>
            </ul>
          </div>
          <div className="customNavSmall">
            <Dropdown>
              <DropdownTrigger><i className="fa fa-bars"></i></DropdownTrigger>
              <DropdownContent>
                <ul className="customNavRight">
                  <li><a className="navbarLink" onClick={() => this.handleNav('van')}>Stations</a></li>
                  <li><a className="navbarLink" onClick={() => this.handleNav('browse')}>Videos</a></li>
                  <li><a className="navbarLink" onClick={() => this.handleNav('users')}>People</a></li>
                  <li><a className="navbarLink" onClick={() => this.handleNav('myLibrary')}>My Library</a></li>
                  <li><a className="navbarLink" onClick={this.handleLogout}>Logout</a></li>
                </ul>
              </DropdownContent>
            </Dropdown>
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
