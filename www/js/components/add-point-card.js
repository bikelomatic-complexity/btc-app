import React, {Component} from 'react';
import { Card, Button, Textfield, Checkbox } from 'react-mdl';
import DropDown from './drop-down';
import HoursTable from './hours-table';

import BlobUtil from 'blob-util';

// import redux components
import { connect } from 'react-redux';

import {addPoint} from '../actions/point-actions';

// export class for testing (use default export in application)
export class AddPointCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointType: 'service', // alert or service
      type: 'Type',         // place type
      name: '',
      description: '',      // description
      checkIn: false,       // mark if they were there or not
      imgSrc: '',           // image url
      imgBlob: '',          // image blob
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
      name: '',
      description: '',
      checkIn: false,
      imgSrc: '',
      imgBlob: '',
      fullscreen: false,
      typeMenu: false,
      addMessage: 'Add Point Here'
    });
  }

  onSubmit() {
    this.props.dispatch(addPoint({
      class: this.state.pointType,
      created_at: new Date().toISOString(),
      name: this.state.name,
      location: [this.props.latlng.lat, this.props.latlng.lng],
      type: this.state.type,
      description: this.state.description,
      flag: false,
      amenities: [],
      seasonal: false,
      schedule: null,
      phone: null,
      rating: 5,
      website: null,
      imageBlob: this.state.imgBlob,
      address: null
    }, this.state.imgBlob));
    this.props.history.pushState(null, '/');
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
    // check device, because of issue - Apache Cordova / CB-9852
    // https://issues.apache.org/jira/browse/CB-9852
    navigator.camera.getPicture(
      imgSrc => {
        this.setState({ imgSrc });
        BlobUtil.imgSrcToBlob(this.state.imgSrc).then(blob => {
          this.setState({'imgBlob':blob});
        })
      },
      err => console.error( err ),
      { sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth:626,
        targetHeight:352,
        destinationType:navigator.camera.DestinationType.FILE_URI,
        encodingType:navigator.camera.EncodingType.PNG
      }
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

    let imgView = <div />
    if (this.state.imgSrc !== '') {
      imgView = <div>
        <img src={this.state.imgSrc} width="100%" />
      </div>
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
                      value={this.state.name} />
        </div>
        <div className="form-row">
          <Textfield  rows={3} label="Description"
                      onChange={this.onDescriptionUpdate.bind(this)}
                      value={this.state.description} />
        </div>
        <div className="form-row">
          <Button colored={this.state.checkIn}
                  raised onClick={this.onCheckIn.bind(this)}>
            {this.state.checkIn ? "Checked In" : "Check In"}
          </Button>
        </div>
        <div className="form-row">
          <Button onClick={this.onPhotoAdd.bind(this)}
                  colored={this.state.imgSrc !== ''} raised>
                  Upload Photo
          </Button>
        </div>
        <div className="form-row">
          { imgView }
        </div>
        <div className="form-row">
          <Button raised onClick={this.onCancel.bind(this)}>
            Cancel
          </Button>
          <Button colored raised onClick={this.onSubmit.bind(this)}>Submit</Button>
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

export default connect()(AddPointCard);
