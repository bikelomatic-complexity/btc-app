import React, {Component} from 'react';
import { Card, CardTitle, CardActions, IconButton, CardText, CardMenu, Button } from 'react-mdl';
import HoursTable from './hours-table';

// import redux components
import { connect } from 'react-redux';
import { peekMarker, fullscreenMarker, deselectMarker } from '../actions/actions';

const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// export class for testing (use default export in application)
export class PointCard extends Component {

  getDays(seasons) {
    let seasonDays = seasons[0].days;
    const date = (new Date());
    seasons.forEach((season)=>{
      if ((season.seasonStart) && (season.seasonEnd) &&
        (season.seasonStart.month <= date.getMonth() <= season.seasonEnd.month) &&
        (season.seasonStart.date <= date.getDate() <= season.seasonEnd.date))
      {
        seasonDays = season.days;
      }
    });
    return seasonDays;
  }

  render() {
    const { dispatch } = this.props;

    let headerHeight = Math.max(55,  55 + this.props.heightOffset);
    let smallHeight = 300 - this.props.heightOffset;
    let cardStyle = {
      width: '100%',
      position: 'fixed',
      bottom: ( (this.props.show=='peek' || this.props.show=='full') ? '0px' : '-300px'),
      height: ( (this.props.show=='full') ? 'calc(100% - '+ headerHeight +'px)' : smallHeight +'px'),
      transition: (this.props.heightOffset == 0 ? 'all 300ms ease' : ''),
      'zIndex':'8'
    }

    let cardTitleStyle = {
      color: '#fff',
      height: '176px',
      background: 'url(' + this.props.point.image + ') center / cover'
    }

    let seeButton = (
      <Button colored onClick={() => {
        dispatch(fullscreenMarker());
      }}>See More</Button>
    );
    if (this.props.show=='full') {
      seeButton = (
        <Button colored onClick={() => {
          dispatch(peekMarker());
        }}>See Less</Button>
      );
    }

    let point = this.props.point;
    let day = this.getDays(point.hours).filter(
      (dayEle)=>{
        return dayMap.indexOf(dayEle.day) == (new Date()).getDay();
      })[0]; // get the day that matches today.

    // when is the service open
    let timeDetails = (<span>{(day) ?
        <span className="open-until"> Open until: {day.closes}</span>
      :
        <span className="open-until"> Not Open Today </span>
      }</span>);

    // small screen details
    let cardDetails = (
      <CardText>
        {point.description}
        {timeDetails}
      </CardText>
    );

    let seasonal = point.hours.length > 1;

    // large screen details
    if (this.props.show=='full') {
      cardDetails = (
        <div id="point-details">
          <CardText> {point.description} {timeDetails}</CardText>
          <CardText>
            {point.type} <br/>
            <span className="amenities"> {point.amenities.join(", ")} </span>
          </CardText>

          <CardText> {point.phone} </CardText>
          <CardText> Visit <a href={point.website}>{point.website}</a> for more details </CardText>
          <HoursTable hours={this.getDays(point.hours)}/>
          { seasonal ? <br/> : <CardText> these hours are seasonal (call or check online for more information) </CardText> }
        </div>
      )
    }

    return (
      <Card id="mdl-map-card" shadow={5} style={cardStyle}>
        <CardTitle style={cardTitleStyle}>{this.props.point.name}</CardTitle>
        { cardDetails }
        <CardActions border className="view-button">
          { seeButton }
          <Button colored onClick={() => {
            dispatch(deselectMarker());
          }}>Dismiss</Button>
        </CardActions>
        <CardMenu style={{color: '#fff'}}>
            <IconButton name="share" />
        </CardMenu>
      </Card>
    );
  }
}

export default connect()(PointCard);
