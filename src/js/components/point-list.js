/*eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
import { Paper, Card, CardHeader, CardTitle, CardText } from 'material-ui';
/*eslint-enable no-unused-vars*/

import { display } from 'btc-models/lib/schema/types';

export class PointList extends Component {
  render() {
    const points = this.props.points.map( point => {
      const avatar = {};
      if( point.coverUrl ) {
        avatar.coverUrl = point.coverUrl;
      }

      return (
        <Card key={ point._id }
          style={ { margin: '10px' } }
          onClick={ this.props.onPointClick.bind( this, point ) }>
          <CardHeader title={ point.name }
            subtitle={ display( point.type ) }
            { ...avatar } />
        </Card>
        );
    } );
    return (
      <Paper>
        { points }
      </Paper>
      );
  }
}

export default PointList;
