/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Paper } from 'material-ui';

import PointMap from '../components/point-map';
import HammerPointCard from '../components/hammer-point-card';
/*eslint-enable no-unused-vars*/

import { connect } from 'react-redux';

import { fullscreenMarker, peekMarker, deselectMarker, selectMarker, setMapCenter, setGeoLocation, setMapZoom, setMapLoading } from '../actions/map-actions';

import { setPointProps, setUpdate } from '../actions/new-point-actions';

class MapPage extends Component {

  componentDidMount() {
    const {setDrawer} = this.props;
    setDrawer( 'Map' );
  }

  render() {
    const {dispatch, marker, services, alerts, tracks, settings, mapState, filters, history} = this.props;

    let selectedPoint;
    if ( marker.selectedMarker ) {
      selectedPoint = marker.selectedMarker;
    } else if ( services.length > 0 ) {
      selectedPoint = services[ 0 ];
    } else {
      selectedPoint = { };
    }

    let pointCard;
    if ( selectedPoint ) {
      pointCard = (
        <HammerPointCard point={ selectedPoint }
          show={ marker.showPointCard }
          fullscreenMarker={ ( ) => dispatch( fullscreenMarker() ) }
          peekMarker={ ( ) => dispatch( peekMarker() ) }
          deselectMarker={ ( ) => dispatch( deselectMarker() ) }
          setPointProps={ point => dispatch( setPointProps( point ) ) }
          setUpdate={ isUpdate => dispatch( setUpdate( isUpdate ) ) }
          history={ history } />
      );
    }

    return (
      <div className="page-content">
        <PointMap services={ services }
          alerts={ alerts }
          tracks={ tracks }
          settings={ settings }
          mapState={ mapState }
          filters={ filters }
          selectMarker={ point => dispatch( selectMarker( point ) ) }
          deselectMarker={ ( ) => dispatch( deselectMarker() ) }
          setMapCenter={ coords => dispatch( setMapCenter( coords ) ) }
          setGeoLocation={ coords => dispatch( setGeoLocation( coords ) ) }
          setMapZoom={ zoom => dispatch( setMapZoom( zoom ) ) }
          setMapLoading={ isLoading => dispatch( setMapLoading( isLoading ) ) } />
        { pointCard }
      </div>
      );
  }
}

function select( state ) {
  return {
    marker: state.marker,
    services: state.points,
    alerts: [],
    tracks: state.tracks.toJS(),
    settings: state.settings.toJS(),
    mapState: state.mapState,
    filters: state.filters
  };
}

export default connect( select )( MapPage );
