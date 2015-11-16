import React, {Component} from 'react';
import { Card, CardTitle, CardActions, IconButton, CardText, CardMenu, Button } from 'react-mdl';
import Hammer from 'react-hammerjs';
import HoursTable from './hours-table';

// import redux components
import { connect } from 'react-redux';
import { deselectMarker } from '../actions/actions';

const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class PointCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false,
      heightOffset: 0,
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
    this.setState({heightOffset:e.deltaY})
    if (e.isFinal) {
      this.setState({heightOffset:0});
      if (e.deltaY < -100) {
        this.setState({fullScreen:true});
      } else if (e.deltaY > 100){
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
    let headerHeight = 55 + this.state.heightOffset;
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
      <Card id="mdl-map-card" shadow={5} style={cardStyle}>
        <Hammer vertical={true} onPan={this.handleSwipe.bind(this)}>
          <CardTitle style={cardTitleStyle}>{this.props.point.name}</CardTitle>
        </Hammer>
        { cardDetails }
        <CardActions border className="view-button">
          {seeButton}
        </CardActions>
        <CardMenu style={{color: '#fff'}}>
            <IconButton name="share" />
        </CardMenu>
      </Card>
    );
  }
}

export default connect()(PointCard);
