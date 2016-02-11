import React, {Component} from 'react';

import { Button, Textfield } from 'react-mdl';
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

  onNameUpdate(name) {
    const { dispatch } = this.props;
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
          <Textfield  label="Name"
                      onChange={this.onNameUpdate.bind(this)}
                      value={this.state.name} />
        </div>
        <div className="form-row">
          <Textfield  label="Location" disabled={true}
                      value={latLngString} />
        </div>
        <DropDown className="form-row"
          raised
          text={displayType(this.props.newPoint.type) || "Select Type"}
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
