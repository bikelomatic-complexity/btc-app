/*eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
import { Paper, Card, CardHeader, CardTitle, CardText } from 'material-ui';
/*eslint-enable no-unused-vars*/

import { display, serviceTypes, alertTypes } from 'btc-models/lib/schema/types';

export class PointList extends Component {
  render() {
    const points = this.props.points.map((point) => {
      return (
        <Card key={ point._id } style={{margin:'10px'}} onClick={()=>{this.props.onPointClick(point);}}>
          <CardHeader
            title={point.name}
            subtitle={ display( point.type ) }
            avatar={point.coverUrl}
            />
        </Card>
      );
    });
    return (
      <Paper>
        { points }
      </Paper>
    );
  }
}

export default PointList;
