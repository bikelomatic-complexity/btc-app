/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Card, CardActions, CardText, FlatButton, CardMedia, CardTitle, CardHeader, IconButton, IconMenu, MenuItem } from 'material-ui';
import LocationIcon from 'material-ui/lib/svg-icons/maps/place';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
/*eslint-enable no-unused-vars*/

import history from '../../history';
import '../../../css/point-card.css';

export class PointCard extends Component {
  getCardContent() {
    return (
      <CardText className="point-card__description">
        { this.props.point.description }
      </CardText>
    );
  }

  getCardState() { }

  componentDidMount() {
    const { pointId } = this.props.params;
    this.props.loadMarker( pointId );
  }

  // Make the MapPage pass the navigateWithId funciton in
  navigate( path ) {
    const id = encodeURIComponent( this.props.point._id );
    return () => history.push( `/${path}/${id}` );
  }

  getIconMenu() {
    return (
      <IconMenu className="point-card__icon-menu"
        iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
        anchorOrigin={ { horizontal: 'right', vertical: 'top' } }
        targetOrigin={ { horizontal: 'right', vertical: 'top' } }
      >
        <MenuItem primaryText='Update Information'
          onClick={ this.navigate( 'update-point' ) } />
        <MenuItem primaryText='Rate Service'
          onClick={ this.navigate( 'rate-point' ) } />
        <MenuItem primaryText='Flag Service'
          onClick={ this.navigate( 'flag-point' ) } />
      </IconMenu>
    );
  }

  render() {
    const {fullscreenMarker, deselectMarker, point} = this.props;

    let coverUrlStyle = {};
    if( point.coverUrl ) {
      coverUrlStyle.backgroundImage = `url(${point.coverUrl})`;
    }

    const state = this.getCardState();
    const className = 'point-card' + (state ? (' ' + state) : '');

    return (
      <Card className={ className }>
        <CardHeader
          className="point-card__header"
          title={ point.name }
          subtitle={ point.type }
          avatar={ <LocationIcon className="point-card__avatar" /> }>
          { this.getIconMenu() }
        </CardHeader>
        <CardMedia className="point-card__media"
          style={ coverUrlStyle } />
        { this.getCardContent() }
        <CardActions className="point-card__actions">
          { this.getCardAction() }
          <FlatButton label="Close" onClick={ deselectMarker } />
        </CardActions>
      </Card>
    );
  }
}

export default PointCard;
