/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Paper } from 'material-ui';

import PointMap from '../components/point-map';
import ConnectedPointMap from './connected-point-map';
/*eslint-enable no-unused-vars*/

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { assign, find } from 'lodash';

import { selectMarker, setMapCenter } from '../actions/map-actions';
import { setRating, setComment } from '../reducers/new-rating';
import { setPointProps } from '../actions/new-point-actions';
import { setDrawer } from '../reducers/drawer';

import history from '../history';

class MapPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setDrawer( 'Map' );
    this.loadMarker( this.props );
  }

  componentWillReceiveProps( nextProps ) {
    this.loadMarker( nextProps );
  }

  // If the user has specified a point to view via the url, and no point
  // is not currently loaded, then try to load it. If we can load the point,
  // then center the map on that point.
  loadMarker( ) {
    const paramId = this.props.params.pointId;
    const pointId = this.props.marker._id;

    if( paramId && !pointId ) {
      const { services } = this.props;
      if( services.length > 0 ) {
        const marker = find( services, { '_id': paramId } );
        if( marker ) {
          this.selectMarker( marker ); // TODO: Merge these for performance
          this.setMapCenter( marker.location );
        }
      }
    }
  }

  deselectMarker() {
    history.push( '/' );
  }

  navigateWithId( prefix ) {
    const id = this.props.marker._id;
    const encodedId = encodeURIComponent( id );

    history.push( `/${prefix}/${encodedId}` );
  }

  mapPropsOnCard() {
    if( !this.props.children ) return;
    const { dispatch, marker, newRating } = this.props;

    const cardState = { newRating, point: marker, heightOffset: 0 };
    const cardActions = { setRating, setComment, setPointProps };
    const cardFunctions = {
      deselectMarker: this.deselectMarker,
      fullscreenMarker: () => this.navigateWithId( 'view-point' ),
      peekMarker: () => this.navigateWithId( 'peek-point' )
    }

    const card = React.Children.only( this.props.children );
    return React.cloneElement( card, {
      ...bindActionCreators( cardActions, dispatch ),
      ...cardState,
      ...cardFunctions
    } );
  }

  render() {
    const props = { };
    props.deselectMarker = this.deselectMarker;
    props.selectMarker = point => {
      this.props.selectMarker( point );
      this.navigateWithId( 'peek-point' );
    }

    return (
      <ConnectedPointMap { ...props }>
        { this.mapPropsOnCard() }
      </ConnectedPointMap>
    );
  }
}

function select( state ) {
  return {
    marker: state.marker,
    services: state.points,
  };
}

const actions = { selectMarker, setMapCenter, setDrawer };

export default connect( select, actions )( MapPage );
