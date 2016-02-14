import React, {Component} from 'react';
import { Card, CardMedia, CardTitle, CardActions, CardText, RaisedButton } from 'material-ui';
import HoursTable from './hours-table';
import { displayType } from '../types'

const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'];

// export class for testing (use default export in application)
export class PointCard extends Component {

  getDays(seasons) {
    let seasonDays = seasons[0].days;
    const date = (new Date());
    const currentMonth = date.getMonth();
    const currentDate = date.getDate();
    seasons.forEach((season)=>{
      if ((season.seasonStart) && (season.seasonEnd) &&
        (season.seasonStart.month <= currentMonth <= season.seasonEnd.month) &&
        (season.seasonStart.date <= currentDate <= season.seasonEnd.date))
      {
        seasonDays = season.days;
      }
    });
    return seasonDays;
  }

  render() {
    const { fullscreenMarker, peekMarker, deselectMarker } = this.props;

    // if we have an image, use that
    // otherwise, use an mdl-blue for the title,
    // and make the card a bit smaller
    let backgroundStyle;
    let titleHeight;
    let smallHeight;

    if (this.props.point.coverUrl) {
      backgroundStyle = `url(${this.props.point.coverUrl}) center / cover`;
      titleHeight = '176px';
      smallHeight = 300 - this.props.heightOffset;
    }
    else {
      backgroundStyle = '#3f51b5';
      titleHeight = '100px';
      smallHeight = 224 - this.props.heightOffset;
    }

    const headerHeight = Math.max(64,  64 + this.props.heightOffset);
    const headerHeightCSS = `calc(100% - ${headerHeight}px)`;
    const smallHeightCSS = `${smallHeight}px`;
    let cardStyle = {
      width: '100%',
      position: 'fixed',
      bottom: ( (this.props.show=='hide') ? '-460px' : '0px'),
      height: ( (this.props.show=='full') ? headerHeightCSS : smallHeightCSS),
      transition: (this.props.heightOffset == 0 ? 'all 300ms ease' : ''),
      zIndex:'8'
    }

    let seeButton = (
      <RaisedButton
        secondary
        onClick={() => {
          fullscreenMarker();
        }}
        label="See More"
      />
    );
    if (this.props.show=='full') {
      seeButton = (
        <RaisedButton
          secondary
          label="See Less"
          onClick={() => {
            peekMarker();
          }}
        />
      );
    }

    // this logic is for points with hour / schedule information
    // TODO: consider revising logic placement
    let point = this.props.point;
    let seasonalDetails = <br/>;
    let timeDetails = "";
    let hoursDetails = "";
    if (point.schedule && point.schedule.length > 0){
      let day = this.getDays(point.schedule).filter(
        (dayEle)=>{
          return dayMap.indexOf(dayEle.day) == (new Date()).getDay();
        })[0]; // get the day that matches today.

      // when is the service open
      timeDetails = (<span>{(day) ?
          <span className="open-until"> Open until: {day.closes}</span>
        :
          <span className="open-until"> Not Open Today </span>
        }</span>);

        // is this point seasonal?
        if (point.seasonal) {
          seasonalDetails = (
            <CardText>
              These hours are seasonal.
              Call or check online for more information.
            </CardText>
          )
        }

        // hours for service
        hoursDetails = <HoursTable hours={this.getDays(point.schedule)}/>
    }

    // small screen details
    let cardDetails = (
      <CardText>
        {point.description}
        {timeDetails}
      </CardText>
    );

    // large screen details
    if (this.props.show=='full') {
      if (point.type === 'alert') {
        cardDetails = (
          <div id="point-details">
            <CardText> {point.description} </CardText>
          </div>
        );
      } else {
        cardDetails = (
          <div id="point-details">
            <CardText> {point.description} {timeDetails}</CardText>
            <CardText>
              {displayType(point.type)} <br/>
              <span className="amenities"> {point.amenities.join(", ")} </span>
            </CardText>

            <CardText> {point.phone} </CardText>
            <CardText>
              Visit <a href={point.website}>{point.website}</a> for more details
            </CardText>
            { hoursDetails }
            { seasonalDetails }
          </div>
        );
      }
    }

    return (
      <Card id="mdl-map-card" className="form-column" style={cardStyle}>
        <CardMedia className="hammer-grab" overlay={
          <CardTitle className="hammer-grab" title={this.props.point.name}/>
        }>
          <img className="hammer-grab" src={this.props.point.coverUrl || 'http://lorempixel.com/600/140/nature/'} style={{height:'140px'}}/>
        </CardMedia>
        { cardDetails }
        <CardActions className="form-row">
          { seeButton }
          <RaisedButton
            onClick={() => {
              deselectMarker();
            }}
            label="Close"
          />
        </CardActions>
      </Card>
    );
  }
}

export default PointCard;
