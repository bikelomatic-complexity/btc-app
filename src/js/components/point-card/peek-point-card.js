/*eslint-disable no-unused-vars*/
import React from 'react';
import { CardText, FlatButton } from 'material-ui';

import PointCard from './point-card';
/*eslint-enable no-unused-vars*/

export class PeekPointCard extends PointCard {
  getCardState() {
    return 'point-card--peek';
  }

  getCardAction() {
    const { fullscreenMarker } = this.props;
    return <FlatButton label="See More" onClick={ fullscreenMarker } />;
  }

  getCardContent() {
    return (
      <CardText className="point-card__description">
        { this.props.point.description }
      </CardText>
    );
  }
}

export default PeekPointCard;
