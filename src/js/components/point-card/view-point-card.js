/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { CardText, FlatButton } from 'material-ui';

import PointCard from './point-card';
import HoursTable from '../hours-table';
/*eslint-enable no-unused-vars*/

import { pointId } from 'btc-models/lib/model/point';
import ServiceViewModel from './service-view-model';

export class ViewPointCard extends PointCard {
  getCardState() {
    return 'point-card--view';
  }

  getCardAction() {
    const {peekMarker} = this.props;
    return <FlatButton label="See Less"
             onClick={ peekMarker } />;
  }

  getCardContent() {
    const {point} = this.props;
    const uri = pointId( point._id );

    let content;
    if ( uri.type === 'alert' ) {
      content = (
        <div className="point-card__content">
          <CardText>
            { point.description }
          </CardText>
        </div>
      );
    } else if ( uri.type === 'service' ) {
      const service = new ServiceViewModel( point );

      let hours, explanation;
      if ( service.hasSchedule() ) {
        hours = <HoursTable hours={ service.getWeekForCurrentSeason() } />;

        explanation = (
          <CardText>
            These hours are seasonal. Call or check online for more information.
          </CardText>
        );
      }

      let website;
      if ( point.website ) {
        website = (
          <span>Website: <a href={ point.website }> { point.website } </a></span>
        );
      }

      let phone;
      if ( point.phone ) {
        phone = (
          <span>Phone: { point.phone }</span>
        );
      }

      content = (
        <div className="point-card__content">
          <CardText>
            <span className="point-card__open-until">{ service.openUntil() + ' — ' }</span>
            <span>{ point.description }</span>
          </CardText>
          <CardText>
            { service.amenities() }
          </CardText>
          <CardText className="point-card__contact">
            { phone }
            { website }
          </CardText>
          { hours }
          { explanation }
        </div>
      );
    }

    return content;
  }
}

export default ViewPointCard;
