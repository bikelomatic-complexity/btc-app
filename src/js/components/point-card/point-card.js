/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Card, CardActions, CardText, FlatButton, CardMedia, CardTitle, CardHeader, IconButton, IconMenu, MenuItem, CircularProgress } from 'material-ui';
import LocationIcon from 'material-ui/lib/svg-icons/maps/place';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
/*eslint-enable no-unused-vars*/

import { Point, Schedule, display } from 'btc-models';
import '../../../css/point-card.css';

import { isEmpty } from 'lodash';

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

  // # componentWillMount
  // Right before we render, check if the point we're trying to load is already
  // in the store. If it's not, we need to load the point in
  // componentDidMount. Until that happens, the render method needs to know
  // the point is fetching.
  componentWillMount() {
    const {params, points} = this.props;
    this.point = points[ params.id ] || { isFetching: true };
  }

  // # componentDidMount
  // The router passes point cards the id of the point to display in `params`.
  // When the component mounts, we need to ensure that point is present in
  // the store, so we dispatch `loadPoint`. However, `loadPoint` is not
  // guaranteed to fetch the point synchronously. If the point is not found
  // immediately, `this.point` will have { isFetching: true } so we can delay
  // rendering the real card.
  //
  // Generally, you are not supposed to put data fetching calls in this
  // method, but `loadPoint` synchronously puts some default data into
  // points[ params.id ] that we need *before* render.
  componentDidMount() {
    const {params, points, loadPoint} = this.props;
    loadPoint( params.id );
    this.point = points[ params.id ];
  }

  // # componentWillReceiveProps
  // See componentDidMount. As we are potentially getting a new id to display
  // from the router, we need to load the point for that id.
  componentWillReceiveProps( nextProps ) {
    const {params, points, loadPoint} = nextProps;
    loadPoint( params.id );
    this.point = points[ params.id ];
  }

  // Return a function that navigates to a different page with the loaded
  // point's id as the parameter.
  navigate( prefix ) {
    const {navigateWithId} = this.props;
    const point = this.point;
    return ( ) => navigateWithId( prefix, point );
  }

  static openUntil( service ) {
    const schedule = new Schedule( service.schedule );
    const closing = schedule.getClosingToday();
    if( closing ) {
      const time = new Date( schedule.getClosingToday() )
        .toLocaleTimeString( [], { hour: 'numeric', minutes: 'numeric ' } );
      return 'Open until: ' + time;
    } else {
      return 'Not open today';
    }
  }

  // Get an english list of available amenities
  static amenities( service ) {
    const {amenities} = service;
    if ( !isEmpty( amenities ) ) {
      let amenities_and = [ ...amenities.map( display ) ];

      let seperator;
      if ( amenities.length > 2 ) { // 1, 2, and 3
        amenities_and.push( 'and ' + amenities_and.pop() );
        seperator = ', ';
      } else if ( amenities.length > 1 ) { // 1 and 2
        amenities_and.push( 'and ' + amenities_and.pop() );
        seperator = ' ';
      } else {
        seperator = '';
      }

      return 'Amenities include: ' + amenities_and.join( seperator );
    } else {
      return 'Amenities: none listed';
    }
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
    const {deselectMarker} = this.props;
    const point = this.point;

    const state = this.getCardState();
    const className = 'point-card' + ( state ? ( ' ' + state ) : '' );

    console.log( 'render', this.point );
    if ( point.isFetching ) {
      return (
        <Card className={ className }>
          <CircularProgress className="point-card__spinner"
            size={ 2 } />
        </Card>
        );
    }

    let coverUrlStyle = {};
    if ( point.coverUrl ) {
      coverUrlStyle.backgroundImage = `url(${point.coverUrl})`;
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
