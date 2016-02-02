import React, {Component} from 'react';

import { Button, Textfield } from 'react-mdl';
import DropDown from './drop-down';

import { connect } from 'react-redux';

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
      type,
      typeMenu: false
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
    this.closeTypeMenu();
  }

  openTypeMenu() {
    this.setState({'typeMenu': true});
  }

  closeTypeMenu() {
    this.setState({'typeMenu': false});
  }

  render() {

    let latLngString = '';
    if (this.props.newPoint.location.length !== 0) {
      const [lat, lng] = this.props.newPoint.location;
      latLngString = `(${lat.toFixed(4)}, ${lng.toFixed(4)})`;
    }

    const serviceTypes = [
      'bar', 'bed & breakfast', 'bike shop', 'campground',
      'convenience store', 'cyclists camping', 'cyclists lodging',
      'grocery', 'hostel', 'hotel/motel', 'library', 'rest area',
      'restroom', 'restaurant', 'state park', 'museum', 'information',
      'airport', 'scenic area', 'hot spring', 'outdoor store',
      'cabin'
    ].sort();
    serviceTypes.push('other'); // other should be last

    let dropDown = '';
    if (this.state.typeMenu) {
      dropDown = <DropDown  elements={serviceTypes}
                            onSelectFunction={this.onTypeSelect.bind(this)}/>;
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
        <div className="form-row">
          <Button raised id="menu-button"
                  onClick={this.openTypeMenu.bind(this)}>
            {(this.state.type) ? this.state.type : "Type"}
          </Button>
        </div>
        { dropDown }
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
