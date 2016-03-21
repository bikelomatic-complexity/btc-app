/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Card, CardActions, CardText, FlatButton, CardMedia, CardTitle, CardHeader, IconButton, IconMenu, MenuItem, CircularProgress } from 'material-ui';
import LocationIcon from 'material-ui/lib/svg-icons/maps/place';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
/*eslint-enable no-unused-vars*/

import { Point, display } from 'btc-models';
import '../../../css/point-card.css';

// The PointCard is the base class for all the states of a point card. These
// include the peek, rate, and view cards.
//
// The base class is responsible for rendering the card, the header, actions,
// and media. The subclasses may implement `getCardContent` to supply anything
// else.
//
// When a card mounts or updates, the card is responsible for dispatching the
// action to load the marker indicated within the React Router params.
export class PointCard extends Component {
  constructor( props ) {
    super( props );
    this.type = Point.uri( props.point._id ).type;
  }

  // Return content do display in the card
  getCardContent() {
    return (
      <CardText className="point-card__description">
        { this.props.point.description }
      </CardText>
      );
  }

  // Return a BEM state class to append to the Card's className
  getCardState() {
    console.error( 'PointCard#getCardState() is abstract' );
  }

  componentDidMount() {
    const {params} = this.props;
    this.props.loadMarker( params.pointId );
  }

  componentWillReceiveProps( nextProps ) {
    const {params} = nextProps;
    this.props.loadMarker( params.pointId );
  }

  // Return a function that navigates to a different page with the loaded
  // point's id as the parameter.
  navigate( prefix ) {
    const {navigateWithId, point} = this.props;
    return ( ) => navigateWithId( prefix, point );
  }

  // The IconMenu at the top right of the card, in the header. It allows the
  // user to:
  //  - update a point's information
  //  - rate and comment on a point
  //  - flag the point
  getIconMenu() {
    return (
      <IconMenu className="point-card__icon-menu"
        iconButtonElement={ <IconButton>
                              <MoreVertIcon />
                            </IconButton> }
        anchorOrigin={ { horizontal: 'right', vertical: 'top' } }
        targetOrigin={ { horizontal: 'right', vertical: 'top' } }>
        <MenuItem primaryText='Update Information'
          onClick={ this.navigate( 'update-point' ) } />
        <MenuItem primaryText='Rate Service'
          onClick={ this.navigate( 'rate-point' ) } />
        <MenuItem primaryText='Flag Service'
          onClick={ this.navigate( 'flag-point' ) } />
      </IconMenu>
      );
  }

  // Display the card if the point is loaded. If not, show a spinner.
  render() {
    const {deselectMarker, point} = this.props;

    let coverUrlStyle = {};
    if ( point.coverUrl ) {
      coverUrlStyle.backgroundImage = `url(${point.coverUrl})`;
    }

    const state = this.getCardState();
    const className = 'point-card' + ( state ? ( ' ' + state ) : '' );

    if ( point.isFetching ) {
      return (
        <Card className={ className }>
          <CircularProgress className="point-card__spinner"
            size={ 2 } />
        </Card>
        );
    }

    return (
      <Card className={ className }>
        <CardHeader className="point-card__header"
          title={ point.name }
          subtitle={ display( point.type ) }
          avatar={ <LocationIcon className="point-card__avatar" /> }>
          { this.getIconMenu() }
        </CardHeader>
        <CardMedia className="point-card__media"
          style={ coverUrlStyle } />
        { this.getCardContent() }
        <CardActions className="point-card__actions">
          { this.getCardAction() }
          <FlatButton label="Close"
            onClick={ deselectMarker } />
        </CardActions>
      </Card>
      );
  }
}

export default PointCard;
