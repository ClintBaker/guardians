import React from 'react';
import * as Redux from 'redux';
import * as actions from 'app/actions/actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = { search: '' };

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearchInput(e) {
    var search = e.target.value;

    this.setState({ search });
  }

  handleSearch(e) {
    e.preventDefault();
    const { search } = this.state;
    this.props.dispatch(actions.getVideoSearch(search));

    this.setState({ search: '' });
  }

  render() {
    return (
        <form className="navbar-form navbar-left" onSubmit={this.handleSearch}>
          <div className="form-group">
            <input className="form-control" placeholder="search" value={this.state.search} onChange={this.handleSearchInput}/>
            <button type="submit" className="btn btn-default">Go</button>
          </div>
        </form>
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
)(Search);


// https://www.youtube.com/watch?v=qs6FJZ9Qz7o
// https://www.youtube.com/watch?v=tbxh2cWokLs
// https://www.youtube.com/watch?v=CUQADT8-JP8
// https://socket.io/docs/
