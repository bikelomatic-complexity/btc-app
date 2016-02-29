/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardActions, CardText, RaisedButton, Paper, IconMenu, MenuItem, IconButton } from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import HoursTable from './hours-table';
/*eslint-enable no-unused-vars*/

import { displayType } from '../types';

const dayMap = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday' ];

// export class for testing (use default export in application)
export class PointCard extends Component {

  getDays( seasons ) {
    let seasonDays = seasons[ 0 ].days;
    const date = ( new Date() );
    const currentMonth = date.getMonth();
    const currentDate = date.getDate();
    seasons.forEach( ( season ) => {
      if ( ( season.seasonStart ) && ( season.seasonEnd ) &&
          ( season.seasonStart.month <= currentMonth <= season.seasonEnd.month ) &&
          ( season.seasonStart.date <= currentDate <= season.seasonEnd.date ) ) {
        seasonDays = season.days;
      }
    } );
    return seasonDays;
  }

  updatePoint() {
    const id = this.props.point._id;
    const urlId = encodeURIComponent( id );
    this.props.history.push( `/update-point/${urlId}` );
  }

  render() {
    const {fullscreenMarker, peekMarker, deselectMarker} = this.props;

    // if we have an image, use that
    // otherwise, use an mdl-blue for the title,
    // and make the card a bit smaller
    let backgroundStyle;
    let titleHeight;
    let smallHeight;

    if ( this.props.point.coverUrl ) {
      backgroundStyle = `url(${this.props.point.coverUrl}) center / cover`;
      titleHeight = '176px';
      smallHeight = 300 - this.props.heightOffset;
    } else {
      backgroundStyle = '#3f51b5';
      titleHeight = '100px';
      smallHeight = 224 - this.props.heightOffset;
    }

    const headerHeight = Math.max( 64, 64 + this.props.heightOffset );
    const headerHeightCSS = `calc(100% - ${headerHeight}px)`;
    const smallHeightCSS = `${smallHeight}px`;
    let cardStyle = {
      width: '100%',
      position: 'fixed',
      bottom: ( ( this.props.show == 'hide' ) ? '-460px' : '0px'),
      height: ( ( this.props.show == 'full' ) ? headerHeightCSS : smallHeightCSS),
      transition: ( this.props.heightOffset == 0 ? 'all 300ms ease' : '' ),
      zIndex: '8',
      overflowY: 'auto'
    };

    let cardTitleStyle = {
      color: '#fff',
      height: titleHeight,
      background: backgroundStyle,
      margin: '0px !important'
    };

    let seeButton = (
    <RaisedButton secondary
      onClick={ ( ) => fullscreenMarker() }
      label="See More" />
    );
    if ( this.props.show == 'full' ) {
      seeButton = (
        <RaisedButton secondary
          label="See Less"
          onClick={ ( ) => peekMarker() } />
      );
    }

    // this logic is for points with hour / schedule information
    // TODO: consider revising logic placement
    let point = this.props.point;
    let seasonalDetails = <br/>;
    let timeDetails = '';
    let hoursDetails = '';
    if ( point.schedule && point.schedule.length > 0 ) {
      let day = this.getDays( point.schedule ).filter(
        ( dayEle ) => {
          return dayMap.indexOf( dayEle.day ) == ( new Date() ).getDay();
        } )[ 0 ]; // get the day that matches today.

      // when is the service open
      const text = day ? `Open until ${day.closes}` : 'Not Open Today';
      timeDetails = <span>
                      <span className='open-until'>
                        { text }
                      </span>
                    </span>;

      // is this point seasonal?
      if ( point.seasonal ) {
        seasonalDetails = (
          <CardText>
            These hours are seasonal. Call or check online for more information.
          </CardText>
        );
      }

      // hours for service
      hoursDetails = <HoursTable hours={ this.getDays( point.schedule ) } />;
    }

    // small screen details
    let cardDetails = (
    <CardText>
      { point.description }
      { timeDetails }
    </CardText>
    );

    // large screen details
    if ( this.props.show == 'full' ) {
      if ( point.type === 'alert' ) {
        cardDetails = (
          <div id="point-details">
            <CardText>
              { point.description }
            </CardText>
          </div>
        );
      } else {
        cardDetails = (
          <div id="point-details">
            <CardText>
              { point.description }
              { timeDetails }
            </CardText>
            <CardText>
              { displayType( point.type ) }
              <br/>
              <span className="amenities">
                { point.amenities.join( ', ' ) }
              </span>
            </CardText>
            <CardText>
              { point.phone }
            </CardText>
            <CardText>
              Visit
              <a href={ point.website }>
                { point.website }
              </a> for more details
            </CardText>
            { hoursDetails }
            { seasonalDetails }
          </div>
        );
      }
    }

    const iconMenuStyle = {
      zIndex: 1,
      float: 'right',
      background: 'rgba(0,0,0,0.6)',
      borderRadius: '100%'
    };
    return (
      <Card id="mdl-map-card"
        className="form-column"
        style={ cardStyle }>
        <CardMedia className="hammer-grab"
          overlay={ <CardTitle className="hammer-grab"
                      title={ this.props.point.name } /> }>
          <div style={ cardTitleStyle }>
            <IconMenu style={ iconMenuStyle }
              iconButtonElement={ <IconButton>
                                    <MoreVertIcon color="white" />
                                  </IconButton> }
              anchorOrigin={ { horizontal: 'right', vertical: 'top' } }
              targetOrigin={ { horizontal: 'right', vertical: 'top' } }>
              <MenuItem primaryText="Update Information"
                onClick={ this.updatePoint.bind( this ) } />
            </IconMenu>
          </div>
        </CardMedia>
        <div style={ { margin: '8px', marginBottom: '64px' } }>
          { cardDetails }
        </div>
        <CardActions className="form-row view-buttons">
          { seeButton }
          <RaisedButton onClick={ ( ) => deselectMarker() }
            label="Close" />
        </CardActions>
      </Card>
      );
  }
}

export default PointCard;
