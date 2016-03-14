/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { CardText, FlatButton } from 'material-ui';

import PointCard from './point-card';
import HoursTable from '../hours-table';
import { displayType } from '../../types';
/*eslint-enable no-unused-vars*/

import { find } from 'lodash';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export class ViewPointCard extends PointCard {
  getCardState() {
    return 'point-card--view';
  }

  getCardAction() {
    const { peekMarker } = this.props;
    return <FlatButton label="See Less" onClick={ peekMarker } />;
  }

  getCardContent() {
    const {point} = this.props;

    let timeDetails, hoursDetails;
    if( point.schedule && point.schedule.length > 0 ) {
      const day = find( this.getDays( point.schedule ), {
        day: days[ new Date().getDay() ]
      } )
      timeDetails = (
        <span className="open-until">
          { day ? `Open until: ${day.closes}` : 'Not Open Today' }
        </span>
      );

      hoursDetails = <HoursTable hours={ this.getDays( point.schedule ) } />;
    }

    let seasonalDetails;
    if( point.seasonal ) {
      seasonalDetails = (
        <CardText>
          These hours are seasonal. Call or check online for more information.
        </CardText>
      );
    }

    return (
      <div className="point-card__content">
        <CardText>
          { point.description }
          { timeDetails }
        </CardText>
        <CardText>
          { 'Amenities: ' + point.amenities.join( ', ' ) }
        </CardText>
        <CardText>
          { 'Phone: ' + point.phone }
        </CardText>
        <CardText>
          Visit <a href={ point.website }>{ point.website }</a> for more details.
        </CardText>
        <div style={ { overflow: 'visible' } }>
          { hoursDetails }
        </div>
        { seasonalDetails }
      </div>
      );
  }

  getDays( seasons ) {
    let seasonDays = seasons[ 0 ].days;
    const date = ( new Date() );
    const curMonth = date.getMonth();
    const curDate = date.getDate();
    seasons.forEach( season => {
      if ( ( season.seasonStart )
          && ( season.seasonEnd )
          && ( season.seasonStart.month <= curMonth <= season.seasonEnd.month )
          && ( season.seasonStart.date <= curDate <= season.seasonEnd.date ) ) {
        seasonDays = season.days;
      }
    } );
    return seasonDays;
  }
}

export default ViewPointCard;
