import React, {Component} from 'react';
import { Card, CardTitle, CardActions, IconButton, CardText, CardMenu, Button } from 'react-mdl';

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
    let cardDetails = (
      <CardText> {point.description} </CardText>
    );
    if (this.state.fullScreen) {
      cardDetails = (
        <div>
          <CardText> {point.description} </CardText>
          <CardText> {point.type} </CardText>
          <CardText> {point.phone} </CardText>
          <CardText> {point.website} </CardText>
        </div>
      )
    }

    return (
      <Card id="mdl-map-card" shadow={5} style={cardStyle}>
        <CardTitle style={cardTitleStyle}>{this.props.point.name}</CardTitle>
        { cardDetails }
        <CardActions border>
          {seeButton}
        </CardActions>
        <CardMenu style={{color: '#fff'}}>
            <IconButton name="share" />
        </CardMenu>
      </Card>
    );
  }
}
