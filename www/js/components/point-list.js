/*eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
import { Paper, Card, CardHeader, CardTitle, CardText } from 'material-ui';
/*eslint-enable no-unused-vars*/

import { displayType, displayAlertType } from '../types';

export class PointList extends Component {
  render() {
    const points = this.props.points.map((point) => {
      return (
        <Card style={{margin:'10px'}} onClick={()=>{this.props.onPointClick(point);}}>
          <CardHeader
            title={point.name}
            subtitle={displayType(point.type) || displayAlertType(point.type) || ''}
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
