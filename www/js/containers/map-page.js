/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Paper } from 'material-ui';

import PointMap from '../components/point-map';
/*eslint-enable no-unused-vars*/

import { connect } from 'react-redux';
import { findIndex } from 'underscore';

import { selectMarker, setMapCenter, setGeoLocation, setMapZoom, setMapLoading } from '../actions/map-actions';

import { setRating, setComment } from '../reducers/new-rating';
import { setPointProps } from '../actions/new-point-actions';

class MapPage extends Component {
  loadMarker( props ) {
    // set the current point (if we got it from a URL param)
    const {dispatch, services, marker} = props;
    const {pointId} = props.params;
    if ( ( marker._id === undefined )
        && ( pointId !== undefined )
        && ( services.length > 0 ) ) {
      const markerIndex = findIndex( services, point => {
        return point._id === pointId;
      } );
      const newMarker = services[ markerIndex ];
      dispatch( selectMarker( newMarker ) );

      // if you selected a marker, we're going to point the map there
      dispatch( setMapCenter( newMarker.location ) );
    }
  }

  componentDidMount() {
    const {setDrawer} = this.props;
    setDrawer( 'Map' );

    this.loadMarker( this.props );
  }

  componentWillReceiveProps( nextProps ) {
    this.loadMarker( nextProps );
  }

  render() {
    const {dispatch, marker, services, alerts, newRating, tracks, settings, mapState, filters, history} = this.props;

    // add props and actions so the component can dispatch actions
    const pointChildren = React.Children.map( this.props.children, child => {
      return React.cloneElement( child, {
        point: marker,
        heightOffset: 0,
        newRating: newRating,
        history: history,
        setRating: rating => dispatch( setRating( rating ) ),
        setComment: comment => dispatch( setComment( comment ) ),
        fullscreenMarker: ( ) => {
          const id = this.props.marker._id;
          const urlId = encodeURIComponent( id );
          this.props.history.push( `/view-point/${urlId}` );
        },
        peekMarker: ( ) => {
          const id = this.props.marker._id;
          const urlId = encodeURIComponent( id );
          this.props.history.push( `/peek-point/${urlId}` );
        },
        deselectMarker: ( ) => this.props.history.push( '/' ),
        setPointProps: ( ) => dispatch( setPointProps( this.props.marker ) )
      } );
    } );

    const selectMarker = point => {
      dispatch( selectMarker( point ) );
      const id = this.props.marker._id;
      const urlId = encodeURIComponent( id );
      this.props.history.push( `/peek-point/${urlId}` );
    };

    return (
      <div className="page-content">
        <PointMap services={ services }
          alerts={ alerts }
          tracks={ tracks }
          settings={ settings }
          mapState={ mapState }
          filters={ filters }
          selectMarker={ selectMarker }
          deselectMarker={ ( ) => this.props.history.push( '/' ) }
          setMapCenter={ coords => dispatch( setMapCenter( coords ) ) }
          setGeoLocation={ coords => dispatch( setGeoLocation( coords ) ) }
          setMapZoom={ zoom => dispatch( setMapZoom( zoom ) ) }
          setMapLoading={ isLoading => dispatch( setMapLoading( isLoading ) ) } />
        { pointChildren }
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
    filters: state.filters,
    newRating: state.newRating
  };
}

export default connect( select )( MapPage );
