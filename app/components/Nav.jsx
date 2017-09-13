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

    this.state = { display: 'none' };

    this.handleLogout = this.handleLogout.bind(this);
    this.renderRoom = this.renderRoom.bind(this);
    this.handleNav = this.handleNav.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    var { display } = this.state;

    if (display == 'none') {
      this.setState({ display: 'inline' });
    } else if (display == 'inline'){
      this.setState({ display: 'none' });
    }
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
    var { display } = this.state;
    return (
      <nav className="navbar navbar-fixed-top ">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand navbarLink" onClick={() => this.handleNav('home')}>Caravan.fm</a>
            <a className="dropdownTrigger" onClick={this.handleToggle}><i className="fa fa-bars"></i></a>
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
              <div className="dropdownContent" style={{display: display}}>
                <ul className="customNavRight">
                  <li><a className="navbarLink" onClick={() => this.handleNav('van')}>Stations</a></li>
                  <li><a className="navbarLink" onClick={() => this.handleNav('browse')}>Videos</a></li>
                  <li><a className="navbarLink" onClick={() => this.handleNav('users')}>People</a></li>
                  <li><a className="navbarLink" onClick={() => this.handleNav('myLibrary')}>My Library</a></li>
                  <li><a className="navbarLink" onClick={this.handleLogout}>Logout</a></li>
                </ul>
              </div>
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
