import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'app/actions/actions';

class Zip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {zip: ''};

    this.onZipChange = this.onZipChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { dispatch } = this.props;
    dispatch(actions.startUpdateZip(this.state.zip));
  }

  onZipChange(event) {
    this.setState({
      zip: event.target.value
    });
  }

  renderZip() {
    const { auth } = this.props;

    if (auth.zip) {
      return (
        <div>
          <h3>Your zip: {auth.zip}</h3>
        </div>
      );
    } else {
      return (
        <form>
          <div className="form-group">
            <label htmlFor="zip">Enter your zipcode</label>
            <input type="text" className="form-control" id="zip" placeholder="Zipcode" value={this.state.zip} onChange={this.onZipChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit" onClick={this.onSubmit}>Submit</button>
          </div>
        </form>
      );
    }
  }

  render () {
    return (
      <div className="container">
        <div className="col-sm-offset-3 col-sm-6">
          {this.renderZip()}
        </div>
      </div>
    );
  }
}


export default Redux.connect(
  (state) => {
    return {
      auth: state.auth
    }
  }
)(Zip);
