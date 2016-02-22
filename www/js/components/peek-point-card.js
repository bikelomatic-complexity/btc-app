import React, {Component} from 'react';
import { Card, CardMedia, CardTitle, CardActions, CardText, RaisedButton } from 'material-ui';

const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'];

export class PeekPointCard extends Component {

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
    const { fullscreenMarker, deselectMarker, point } = this.props;

    // if we have an image, use that
    // otherwise, use an mdl-blue for the title,
    // and make the card a bit smaller
    let backgroundStyle;
    let titleHeight;
    let smallHeight;

    if (point.coverUrl) {
      backgroundStyle = `url(${point.coverUrl}) center / cover`;
      titleHeight = '176px';
      smallHeight = 300 - this.props.heightOffset;
    }
    else {
      backgroundStyle = '#3f51b5';
      titleHeight = '100px';
      smallHeight = 224 - this.props.heightOffset;
    }

    const headerHeight = Math.max(64,  64 + this.props.heightOffset);
    const smallHeightCSS = `${smallHeight}px`;
    let cardStyle = {
      width: '100%',
      position: 'fixed',
      bottom: '0px',
      height: smallHeightCSS,
      transition: (this.props.heightOffset == 0 ? 'all 300ms ease' : ''),
      zIndex:'8',
      overflowY:'auto'
    }

    let cardTitleStyle = {
      color: '#fff',
      height: titleHeight,
      background: backgroundStyle,
      margin: '0px !important'
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

    // this logic is for points with hour / schedule information
    // TODO: consider revising logic placement
    let timeDetails = "";
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
    }

    // small screen details
    let cardDetails = (
      <CardText>
        {point.description}
        {timeDetails}
      </CardText>
    );

    return (
      <Card id="mdl-map-card" className="form-column" style={cardStyle}>
        <CardMedia className="hammer-grab" overlay={
          <CardTitle className="hammer-grab" title={point.name}/>
        }>
          <div style={cardTitleStyle} />
        </CardMedia>
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

export default PeekPointCard;
