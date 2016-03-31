/*eslint-disable no-unused-vars*/
import React from 'react';
import { CardText, FlatButton } from 'material-ui';

import PointCard from './point-card';
/*eslint-enable no-unused-vars*/

import { Point } from 'btc-models';

export class PeekPointCard extends PointCard {
  getCardState() {
    return 'point-card--peek';
  }

  getCardAction() {
    return <FlatButton label="See More"
             onClick={ this.navigate( 'view-point' ) } />;
  }

  getCardContent() {
    const point = this.point;
    const {type} = Point.uri( point._id );

    let openUntil;
    if ( type === 'service' ) {
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
