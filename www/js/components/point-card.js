import React, {Component} from 'react';
import { Card, CardTitle, CardActions, IconButton, CardText, CardMenu, Button } from 'react-mdl';

export default class PointCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let cardStyle = {
      width: '100%',
      position: 'fixed',
      bottom: (this.props.show ? '0px' : '-300px'),
      transition: 'all 300ms ease',
      'zIndex':'8'
    }
    let cardTitleStyle = {
      color: '#fff',
      height: '176px',
      background: 'url(' + this.props.point.image + ') center / cover'
    }
    return (
      <Card id="mdl-map-card" shadow={5} style={cardStyle}>
        <CardTitle style={cardTitleStyle}>{this.props.point.name}</CardTitle>
        <CardText>
            {this.props.point.description}
        </CardText>
        <CardActions border>
            <Button colored>See More</Button>
        </CardActions>
        <CardMenu style={{color: '#fff'}}>
            <IconButton name="share" />
        </CardMenu>
      </Card>
    );
  }
}
