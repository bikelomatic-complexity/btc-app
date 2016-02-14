import React, {Component} from 'react';

import { TextField } from 'material-ui';
import DropDown from './drop-down';

import { types, displayType } from '../types';

export class AddPointName extends Component {

  constructor(props) {
    super(props);
    const { name, type } = this.props.newPoint;
    this.state = {
      name,
      type
    }
  }

  componentDidMount() {
    const { setDrawer } = this.props;
    setDrawer('Enter Information');
  }

  onNameUpdate(event) {
    const { setPointName } = this.props;
    const name = event.target.value;
    this.setState({name});
    setPointName(name);
  }

  onTypeSelect(type) {
    const { setPointType } = this.props;
    this.setState({type});
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

export default AddPointName;
