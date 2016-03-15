/*eslint-disable no-unused-vars*/
import React from 'react';
import { CardText, FlatButton } from 'material-ui';

import PointCard from './point-card';
/*eslint-enable no-unused-vars*/

import ServiceViewModel from './service-view-model';
import { pointId } from 'btc-models/lib/model/point';

export class PeekPointCard extends PointCard {
  getCardState() {
    return 'point-card--peek';
  }

  getCardAction() {
    const { fullscreenMarker } = this.props;
    return <FlatButton label="See More" onClick={ fullscreenMarker } />;
  }

  getCardContent() {
    const { point } = this.props;
    const uri = pointId( point._id );

    let openUntil;
    if( uri.type === 'service' ) {
      const service = new ServiceViewModel( point );
      openUntil = (
        <span className="point-card__open-until">
          { service.openUntil() + ' — ' }
        </span>
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
