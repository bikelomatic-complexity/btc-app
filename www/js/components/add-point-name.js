import React, {Component} from 'react';

import { TextField } from 'material-ui';
import DropDown from './drop-down';

import { connect } from 'react-redux';

import { types, displayType } from '../types';

import {
  setPointName,
  setPointType
 } from '../actions/new-point-actions';

export class AddPointName extends Component {

  constructor(props) {
    super(props);
    const { name, type } = this.props.newPoint;
    this.state = {
      name,
      type
    }
  }

  onNameUpdate(event) {
    const { dispatch } = this.props;
    const name = event.target.value;
    this.setState({name});
    dispatch(setPointName(name));
  }

  onTypeSelect(type) {
    const { dispatch } = this.props;
    this.setState({type});
    dispatch(setPointType(type));
  }

  render() {
    let latLngString = '';
    if (this.props.newPoint.location.length !== 0) {
      const [lat, lng] = this.props.newPoint.location;
      latLngString = `(${lat.toFixed(4)}, ${lng.toFixed(4)})`;
    }

    return (
      <div className="form-column">
        <div className="form-row">
          <TextField  hintText="Name"
                      onChange={this.onNameUpdate.bind(this)}
                      value={this.state.name} />
        </div>
        <div className="form-row">
          <TextField  floatingLabelText="Location" disabled={true}
                      value={latLngString} />
        </div>
        <DropDown
          className="form-row"
          text="Select Type"
          options={types}
          textTransform={displayType}
          onSelectFunction={this.onTypeSelect.bind(this)}/>;
      </div>
    )
  }
}

function select(state) {
  return {
    newPoint: state.newPoint
  };
}

export default connect(select)(AddPointName);
