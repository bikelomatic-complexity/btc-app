import React, {Component} from 'react';
import { Card, Button, Menu, MenuItem } from 'react-mdl';
import HoursTable from './hours-table';

// import redux components
import { connect } from 'react-redux';

// export class for testing (use default export in application)
export class AddPointCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointType: 'service',        // alert or service
      type: '',             // place type
      description: '',      // description
      checkin: false,       // mark if they were there or not
      img: '',              // image url
      fullscreen: false     // should the card cover the map
    }
  }

  onLocationSelect() {
    this.setState({'fullscreen': !this.state.fullscreen});
  }

  onServiceSelect() {
    this.setState({'pointType': 'service'});
  }

  onAlertSelect() {
    this.setState({'pointType': 'alert'});
  }

  render() {

    let latLngString = `(${this.props.latlng.join(',')})`;

    let cardStyle = {
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
      Add Point Here
    </Button>

    let isService = (this.state.pointType === 'service');
    let isAlert = (this.state.pointType === 'alert');

    let serviceTypes = [
      'bar', 'bed & breakfast', 'bike shop', 'campground',
      'convenience store', 'cyclists camping', 'cyclists lodging',
      'grocery', 'hostel', 'hotel/motel', 'library', 'rest area',
      'restroom', 'restaurant', 'state park', 'museum', 'information',
      'airport', 'scenic area', 'hot spring', 'outdoor store',
      'cabin'
    ].sort();
    serviceTypes.push('other'); // other should be last

    let serviceOptions = serviceTypes.map((service)=> {
      return <MenuItem key={service}>{service}</MenuItem>;
    })

    if (this.state.fullscreen) {
      view = <div>
        <Button primary={isService} colored={isService} raised
                onClick={this.onServiceSelect.bind(this)}>
          Service
        </Button>
        <Button accent={isAlert} colored={isAlert} raised
                onClick={this.onAlertSelect.bind(this)}>
          Alert
        </Button>
        <Button raised onClick={this.onLocationSelect.bind(this)}>
                Location {latLngString}
        </Button>
        <Button raised id="menu-button">Menu</Button>
        <Menu target="menu-button" align='left' valign='bottom'>
          { serviceOptions }
        </Menu>



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
