import React, {Component} from 'react';
import { Card, CardActions, CardText, RaisedButton, Paper } from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import HoursTable from './hours-table';
import { displayType } from '../types'
import PointHeader from './point-header';

const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'];

export class ViewPointCard extends Component {

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
    const { peekMarker, deselectMarker, point, history } = this.props;

    const headerHeight = Math.max(64,  64 + this.props.heightOffset);
    const headerHeightCSS = `calc(100% - ${headerHeight}px)`;
    let cardStyle = {
      width: '100%',
      position: 'fixed',
      bottom: '0px',
      height: headerHeightCSS,
      transition: 'all 300ms ease' ,
      zIndex:'8',
      overflowY:'auto'
    }

    let seeButton = (
      <RaisedButton
        secondary
        label="See Less"
        onClick={() => {
          peekMarker();
        }}
      />
    );

    // this logic is for points with hour / schedule information
    // TODO: consider revising logic placement
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

    let cardDetails;
    // large screen details
    if (point.type === 'alert') {
      cardDetails = (
        <div id="point-details">
          <CardText> {point.description} </CardText>
        </div>
      );
    } else {
      let pointAmenities = '';
      if (point.amenities !== undefined) {
        pointAmenities = point.amenities.join(", ");
      }
      cardDetails = (
        <div id="point-details">
          <CardText> {point.description} {timeDetails}</CardText>
          <CardText>
            {displayType(point.type)} <br/>
            <span className="amenities"> {pointAmenities} </span>
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

    return (
      <Card id="mdl-map-card" className="form-column" style={cardStyle}>
        <PointHeader  point={this.props.point} history={history} />
        <div style={{margin:'8px', marginBottom:'64px'}}>
          { cardDetails }
        </div>
        <CardActions className="form-row view-buttons">
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

export default ViewPointCard;
