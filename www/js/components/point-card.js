import React, {Component} from 'react';
import { Card, CardTitle, CardActions, IconButton, CardText, CardMenu, Button } from 'react-mdl';
import Hammer from 'react-hammerjs';
import HoursTable from './hours-table';

// import redux components
import { connect } from 'react-redux';
import { deselectMarker } from '../actions/actions';

const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// export class for testing (use default export in application)
export class PointCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false,
      heightOffset: 0,
      changeScreen: false
    };
  }
  onSeeMore() {
    this.setState({fullScreen:true});
  }
  onSeeLess() {
    this.setState({fullScreen:false});
  }
  handleSwipe(e) {
    const { dispatch } = this.props;
    const pointDetails = document.getElementById('point-details');
    /* if we are at the top of the card, pulling down should shrink the card */
    if (this.state.fullScreen) {
      // in full screen
      // because hammer onPanStart doesn't work, just check if that time of the action was within 0.15s
      if ((pointDetails.scrollTop == 0) && (e.isFirst || e.deltaTime < 150)) {
        // you can change the screen state since you're at the top
        this.setState({changeScreen: true});
      }
      if ((pointDetails.scrollTop == 0) && this.state.changeScreen) {
        // at the top of the details
        this.setState({heightOffset: e.deltaY});
      }
      if (e.target.classList.contains("mdl-card__title") || e.target.classList.contains("mdl-card__title-text")) {
        // at the top of the details
        this.setState({heightOffset: e.deltaY});
        this.setState({changeScreen: true});
      }
    } else {
      // in peek screen
      this.setState({changeScreen: true});
      this.setState({heightOffset: e.deltaY});
    }
    /* Change the screen size (to full, peek, or hide) */
    if (e.isFinal && this.state.changeScreen) {
      this.setState({heightOffset: 0, changeScreen: false});
      if (e.deltaY < -120) {
        this.setState({fullScreen:true});
      } else if (e.deltaY > 120){
        if (this.state.fullScreen) {
          this.setState({fullScreen:false});
        } else {
          dispatch(deselectMarker());
        }
      }
    }
  }
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
    let headerHeight = Math.max(55,  55 + this.state.heightOffset);
    let smallHeight = 300 - this.state.heightOffset;
    let cardStyle = {
      width: '100%',
      position: 'fixed',
      bottom: (this.props.show ? '0px' : '-300px'),
      height: (this.state.fullScreen ? 'calc(100% - '+ headerHeight +'px)' : smallHeight +'px'),
      transition: (this.state.heightOffset == 0 ? 'all 300ms ease' : ''),
      'zIndex':'8'
    }
    let cardTitleStyle = {
      color: '#fff',
      height: '176px',
      background: 'url(' + this.props.point.image + ') center / cover'
    }
    let seeButton = (
      <Button colored onClick={this.onSeeMore.bind(this)}>See More</Button>
    );
    if (this.state.fullScreen) {
      seeButton = (
        <Button colored onClick={this.onSeeLess.bind(this)}>See Less</Button>
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
    if (this.state.fullScreen) {
      cardDetails = (
        <div id="point-details">
          <CardText> {point.description} {timeDetails}</CardText>
          <CardText> {point.type} </CardText>
          {point.amenities.map((amenity) => {
            return(<CardText>- {amenity}</CardText>)
          })}
          <CardText> {point.phone} </CardText>
          <CardText> Visit <a href={point.website}>{point.website}</a> for more details </CardText>
          { seasonal ? <br/> : <CardText> these hours are seasonal (call or check online for more information) </CardText> }
          <HoursTable hours={this.getDays(point.hours)}/>
        </div>
      )
    }

    return (
      <Hammer vertical={true} onPanStart={this.handleSwipe.bind(this)} onPan={this.handleSwipe.bind(this)}>
        <Card id="mdl-map-card" shadow={5} style={cardStyle}>
          <CardTitle style={cardTitleStyle}>{this.props.point.name}</CardTitle>
          { cardDetails }
          <CardActions border className="view-button">
            {seeButton}
          </CardActions>
          <CardMenu style={{color: '#fff'}}>
              <IconButton name="share" />
          </CardMenu>
        </Card>
      </Hammer>
    );
  }
}

export default connect()(PointCard);
