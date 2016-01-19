import React, {Component} from 'react';
import { Card, Button, Textfield, Checkbox } from 'react-mdl';
import DropDown from './drop-down';
import HoursTable from './hours-table';

// import redux components
import { connect } from 'react-redux';

// export class for testing (use default export in application)
export class AddPointCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointType: 'service', // alert or service
      type: 'Type',         // place type
      description: '',      // description
      checkIn: false,       // mark if they were there or not
      img: '',              // image url
      fullscreen: false,    // should the card cover the map
      typeMenu: false,       // should the type menu be open
      addMessage: 'Add Point Here' // message to show on adding a point
    }
  }

  onLocationSelect() {
    this.setState({
      'fullscreen': !this.state.fullscreen,
      'addMessage': 'Set New Location'
    });
  }

  onServiceSelect() {
    this.setState({'pointType': 'service'});
  }

  onAlertSelect() {
    this.setState({'pointType': 'alert'});
  }

  onCheckIn() {
    this.setState({'checkIn': !this.state.checkIn});
  }

  onCancel() {
    this.setState({
      pointType: 'service',
      type: 'Type',
      name: 'Name',
      description: '',
      checkIn: false,
      img: '',
      fullscreen: false,
      typeMenu: false,
      addMessage: 'Add Point Here'
    });
  }

  onTypeSelect(type) {
    this.setState({'type': type});
    this.closeTypeMenu();
  }

  openTypeMenu() {
    this.setState({'typeMenu': true});
  }

  closeTypeMenu() {
    this.setState({'typeMenu': false});
  }

  onDescriptionUpdate(newText) {
    this.setState({'description': newText});
  }

  onNameUpdate(newText) {
    this.setState({'name': newText});
  }

  onPhotoAdd() {
    window.imagePicker.getPictures(
      img => this.setState({ img }),
      err => console.error( err ),
      {maxImages: 1}
    )
  }

  render() {
    const {lat, lng} = this.props.latlng;
    const latLngString = `(${lat.toFixed(4)}, ${lng.toFixed(4)})`;

    const cardStyle = {
      position: 'fixed',
      bottom: '0px',
      width: '100%',
      minHeight: '0px',
      // 55px is the height of the title bar,
      // 36px is the default height of the button
      height: (this.state.fullscreen ? 'calc(100% - 55px)' : '36px'),
      transition: 'all 300ms ease',
      zIndex: 8
    }

    let view = <Button colored onClick={this.onLocationSelect.bind(this)}>
      { this.state.addMessage }
    </Button>

    const isService = (this.state.pointType === 'service');
    const isAlert = (this.state.pointType === 'alert');

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
                            func={this.onTypeSelect.bind(this)}/>;
    }

    if (this.state.fullscreen) {
      view = <div className="form-column">
        <div className="form-row">
          <Button primary={isService} colored={isService} raised
                  onClick={this.onServiceSelect.bind(this)}>
            Service
          </Button>
          <Button accent={isAlert} colored={isAlert} raised
                  onClick={this.onAlertSelect.bind(this)}>
            Alert
          </Button>
        </div>
        <div className="form-row">
          <Button raised onClick={this.onLocationSelect.bind(this)}>
            Location {latLngString}
          </Button>
        </div>
        <div className="form-row">
          <Button raised id="menu-button"
                  onClick={this.openTypeMenu.bind(this)}>
            {this.state.type}
          </Button>
        </div>
        { dropDown }
        <div className="form-row">
          <Textfield  label="Name"
                      onChange={this.onNameUpdate.bind(this)}
                      value={this.state.name}>
          </Textfield>
        </div>
        <div className="form-row">
          <Textfield  rows={3} label="Description"
                      onChange={this.onDescriptionUpdate.bind(this)}
                      value={this.state.description}>
          </Textfield>
        </div>
        <div className="form-row">
          <Button colored={this.state.checkIn}
                  raised onClick={this.onCheckIn.bind(this)}>
            {this.state.checkIn ? "Checked In" : "Check In"}
          </Button>
        </div>
        <div className="form-row">
          <Button onClick={this.onPhotoAdd.bind(this)}
                  colored={this.state.img !== ''} raised>
                  Upload Photo
          </Button>
        </div>
        <div className="form-row">
          <Button raised onClick={this.onCancel.bind(this)}>
            Cancel
          </Button>
          <Button colored raised>Submit</Button>
        </div>
      </div>
    }

    return (
      <Card id="mdl-add-point-card" style={cardStyle} shadow={5}>
        { view }
      </Card>
    );
  }
}

export default AddPointCard;
