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
    const {fullscreenMarker} = this.props;
    return <FlatButton label="See More"
             onClick={ fullscreenMarker } />;
  }

  getCardContent() {
    const {point} = this.props;

    let openUntil;
    if ( this.type === 'service' ) {
      openUntil = (
        <span className="point-card__open-until">{ PointCard.openUntil( point ) + ' — ' }</span>
      );
    }

    return (
      <CardText className="point-card__description">
        { openUntil }
        <span>{ point.description }</span>
      </CardText>
      );
  }
}

export default PeekPointCard;
