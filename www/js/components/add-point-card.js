import React, {Component} from 'react';
import { Card, CardTitle, CardActions, IconButton, CardText, CardMenu, Button } from 'react-mdl';
import HoursTable from './hours-table';

// import redux components
import { connect } from 'react-redux';

// export class for testing (use default export in application)
export class AddPointCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointType: '',        // alert or place
      type: '',             // place type
      description: '',      // description
      checkin: false,       // mark if they were there or not
      img: '',              // image url
      fullscreen: false     // should the card cover the map
    }
  }

  onLocationSelect() {
    this.setState({'fullscreen': true});
  }

  render() {

    let cardStyle = {
      position: 'fixed',
      bottom: '0px',
      width: '100%',
      minHeight: '0px',
      height: (this.state.fullscreen ? 'calc(100% - 55px)' : 'initial'),
      transition: 'all 300ms ease',
      zIndex: 8
    }

    return (
      <Card id="mdl-add-point-card" style={cardStyle} shadow={5}>
        <Button colored onClick={this.onLocationSelect.bind(this)}>
          Add Point Here
        </Button>
      </Card>
    );
  }
}

export default AddPointCard;
