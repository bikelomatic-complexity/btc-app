import React, {Component} from 'react';

import { TextField } from 'material-ui';
import DropDown from './drop-down';

import { types, displayType } from '../types';

export class AddPointName extends Component {

  componentDidMount() {
    const { setDrawer } = this.props;
    setDrawer(this.props.update ? 'Update Information' : 'Enter Information') ;
  }

  onNameUpdate(event) {
    const { setPointName } = this.props;
    const name = event.target.value;
    setPointName(name);
  }

  onTypeSelect(type) {
    const { setPointType } = this.props;
    setPointType(type);
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
                      disabled={this.props.update}
                      onBlur={this.onNameUpdate.bind(this)}
                      defaultValue={this.props.newPoint.name} />
        </div>
        <div className="form-row">
          <TextField  floatingLabelText="Location" disabled={true}
                      value={latLngString} />
        </div>
        <DropDown
          className="form-row"
          text="Select Type"
          value={this.props.newPoint.type}
          options={types}
          textTransform={displayType}
          onSelectFunction={this.onTypeSelect.bind(this)}/>
      </div>
    )
  }
}

export default AddPointName;
