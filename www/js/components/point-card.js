import React, {Component} from 'react';
import { Card, CardTitle, CardActions, IconButton, CardText, CardMenu, Button } from 'react-mdl';
import Hammer from 'react-hammerjs';
import HoursTable from './hours-table';

const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default class PointCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false
    };
  }
  onSeeMore() {
    this.setState({fullScreen:true});
  }
  onSeeLess() {
    this.setState({fullScreen:false});
  }
  handleSwipe(e) {
    console.log(e)
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
    let cardStyle = {
      width: '100%',
      position: 'fixed',
      bottom: (this.props.show ? '0px' : '-300px'),
      height: (this.state.fullScreen ? 'calc(100% - 55px)' : '300px'),
      transition: 'all 300ms ease',
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

    // small screen details
    let cardDetails = (
      <CardText>
        {point.description}
        {(day) ?
          <span className="open-until"> Open until: {day.closes}</span>
        :
          <span className="open-until"> Not Open Today </span>
        }
      </CardText>
    );

    // large screen details
    if (this.state.fullScreen) {
      cardDetails = (
        <div className="point-details">
          <CardText> {point.description} </CardText>
          <CardText> {point.type} </CardText>
          <CardText> {point.phone} </CardText>
          <HoursTable hours={this.getDays(point.hours)}/>
          <CardText> Visit <a href={point.website}>{point.website}</a> for more details </CardText>
        </div>
      )
    }

    return (
      <Hammer vertical={true} onPan={this.handleSwipe}>
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
