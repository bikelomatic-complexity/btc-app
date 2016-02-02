import React, {Component} from 'react';
import { Textfield, Button } from 'react-mdl';

import {
  setPointDescription,
  setPointAddress,
  setPointWebsite,
  setPointPhone
 } from '../actions/new-point-actions';

// import redux components
import { connect } from 'react-redux';

export class AddPointDescription extends Component {
  constructor(props) {
    super(props);

    const { description, phoneNumber, address, website} = this.props.newPoint;
    this.state = {
      description,
      phoneNumber,
      address,
      website
    };
  }

  onDescriptionUpdate(newText) {
    const { dispatch } = this.props;
    this.setState({description:newText});
    dispatch(setPointDescription(newText));
  }

  onPhoneUpdate(newText) {
    const { dispatch } = this.props;
    this.setState({phoneNumber:newText});
    dispatch(setPointPhone(newText));
  }

  onWebsiteUpdate(newText) {
    const { dispatch } = this.props;
    this.setState({website:newText});
    dispatch(setPointWebsite(newText));
  }

  onAddressUpdate(newText) {
    const { dispatch } = this.props;
    this.setState({address:newText});
    dispatch(setPointAddress(newText));
  }

  render() {
    return (
      <div className="form-column">
        <div className="form-row">
          <Textfield  rows={3} label="Description"
                      onChange={this.onDescriptionUpdate.bind(this)}
                      value={this.state.description} />
        </div>
        <div className="form-row">
          <Textfield  label="Phone Number"
                      onChange={this.onPhoneUpdate.bind(this)}
                      value={this.state.phoneNumber} />
        </div>
        <div className="form-row">
          <Textfield  label="Address"
                      onChange={this.onAddressUpdate.bind(this)}
                      value={this.state.address} />
        </div>
        <div className="form-row">
          <Textfield  label="Website"
                      onChange={this.onWebsiteUpdate.bind(this)}
                      value={this.state.website} />
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    newPoint: state.newPoint
  };
}

export default connect(select)(AddPointDescription);