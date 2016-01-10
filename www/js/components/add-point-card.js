import React, {Component} from 'react';
import { Card, CardTitle, CardActions, IconButton, CardText, CardMenu, Button } from 'react-mdl';
import HoursTable from './hours-table';

// import redux components
import { connect } from 'react-redux';
import { peekMarker, fullscreenMarker, deselectMarker } from '../actions/actions';

// export class for testing (use default export in application)
export class PointCard extends Component {

  render() {
    return (
      <Card id="mdl-map-card" shadow={5}>
        <Button>Submit</Button>
        <Button>Cancel</Button>
      </Card>
    );
  }
}

export default connect()(PointCard);
