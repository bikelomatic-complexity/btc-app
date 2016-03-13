/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { CircularProgress } from 'material-ui';

import * as Leaflet from 'react-leaflet';
const {Marker, Popup, Map, TileLayer, CircleMarker, MultiPolyline, setIconDefaultImagePath} = Leaflet;

import MBTilesLayer from './mbtiles-layer';
/*eslint-enable no-unused-vars*/

import { values, bindAll } from 'underscore';
import noop from 'lodash/noop';

setIconDefaultImagePath( 'img/icons' );

export class PointMap extends Component {
  constructor( props ) {
    super( props );
    const {mapState} = this.props;
    this.state = {
      startCenter: mapState.center,
      center: mapState.center,
      zoom: mapState.zoom
    };
    bindAll( this, 'onMapMoved' );
  }

  componentDidMount() {
    const {mapState, setGeoLocation, setMapCenter, setMapLoading} = this.props;
    if ( mapState.loading ) {
      navigator.geolocation.getCurrentPosition(
        ( pos ) => {
          const {latitude, longitude} = pos.coords;
          const coords = [ latitude, longitude ];
          setGeoLocation( coords );
          setMapCenter( coords );
          setMapLoading( false );
          this.setState( {
            startCenter: coords,
            center: coords,
            zoom: 13
          } );
        },
        ( err ) => {
          console.error( err );
          setMapLoading( false );
        },
        {
          timeout: 5000
        }
      );
    }
  }

  componentWillUnmount() {
    const {setMapZoom, setMapCenter} = this.props;
    setMapZoom( this.state.zoom );
    setMapCenter( this.state.center );
  }

  componentWillReceiveProps( nextProps ) {
    const {mapState} = nextProps;
    this.setState( {
      startCenter: mapState.center
    } );
  }

  shouldComponentUpdate( nextProps, nextState ) {
    return ( this.props.mapState.loading !== nextProps.mapState.loading ) ||
      ( this.state.startCenter !== nextState.startCenter ) ||
      ( this.state.startCenter !== nextProps.mapState.center ) ||
      ( this.props.services.length !== nextProps.services.length );
  }

  onMapMoved( leaflet ) {
    const {lat, lng} = leaflet.target.getCenter();
    this.setState( {
      zoom: leaflet.target.getZoom(),
      center: [ lat, lng ]
    },
      this.props.afterMoved.bind( this, leaflet )
    );
  }

  render() {
    const {tracks, settings, mapState, deselectMarker, selectMarker, filters, children} = this.props;

    let markers = this.props.services.filter( ( service ) => {
      if ( service.class == 'alert' && filters.hideAlert ) {
        return false;
      }
      if ( filters.activeFilters.length == 0 ) {
        return true;
      }

      return filters.activeFilters.some( filterElement => {
        // join the service amenities with the service type
        let serviceTypes = service.amenities.concat( service.type );
        if ( serviceTypes.indexOf( filterElement ) !== -1 ) {
          return true;
        }
      } );
    } ).map( ( service ) => {
      const onClick = ( ) => {
        if ( !this.props.addPoint ) {
          selectMarker( service );
        }
      };
      return (
        <Marker key={ service._id }
          radius={ 10 }
          position={ service.location }
          onclick={ onClick } />
        );
    } );

    // Display waypoints for active tracks
    const activeTracks = values( tracks ).filter( track => track.active );
    const trackViews = activeTracks.map( track => {
      return (
        <MultiPolyline key={ track._id }
          polylines={ track.waypoints }
          color="#f30"
          opacity="0.8" />
        );
    } );

    // If offline, display tile layers for tracks with available packages
    const availableTracks = values( tracks )
      .filter( track => track.status === 'available' );

    const tileLayerInfo = {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attr: `&copy; <a href="http://osm.org/copyright">
              OpenStreetMap</a>contributors`
    };

    // In online mode, use tiles from OpenStreetMap. When offline, display
    // tiles from the first availble mbtiles package. If no tile packages
    // are availale when offline, display no tile layers.
    // TODO: display multiple offline tile layers concurrently
    let tileLayer;
    if ( settings.onlineMode ) {
      tileLayer = (
        <TileLayer url={ tileLayerInfo.url } attribution={ tileLayerInfo.attr } />
      );
    } else if ( availableTracks.length > 0 ) {
      const pkg = availableTracks[ 0 ].pkg;
      tileLayer = (
        <MBTilesLayer pkg={ pkg }
          url={ tileLayerInfo.url }
          attribution={ tileLayerInfo.attr } />
      );
    }

    let circleMarker = '';
    if ( mapState.geolocation ) {
      circleMarker = <CircleMarker center={ mapState.geolocation } />;
    }

    let view;
    if ( mapState.loading ) {
      view = (
        <div style={ { margin: 'auto' } }>
          <CircularProgress size={ 2 } />
        </div>
      );
    } else {
      view = (
        <Map center={ this.state.startCenter }
          zoom={ this.state.zoom }
          onLeafletMove={ this.props.onLeafletMove }
          onLeafletMoveEnd={ this.onMapMoved }
          onclick={ ( ) => {
            if ( !this.props.addPoint ) {
              deselectMarker();
            }
          } }>
          { circleMarker }
          { tileLayer }
          { markers }
          { trackViews }
          { children }
        </Map>
      );
    }

    return view;
  }
}

PointMap.defaultProps = { onLeafletMove: noop, afterMoved: noop };

export default PointMap;
