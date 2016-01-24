import React, { Component } from 'react';
import { Spinner, CardText } from 'react-mdl';
import { connect } from 'react-redux';
import { keys, values } from 'underscore';

import * as leaflet from 'react-leaflet';
let {Marker, Popup, Map, TileLayer, CircleMarker, MultiPolyline} = leaflet;
import MBTilesLayer from './mbtiles-layer';

import { selectMarker, deselectMarker } from '../actions/map_actions';

leaflet.setIconDefaultImagePath('img/icons');

class PointMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startPos:[0,0],
      loadingGeolocation: true,
      zoom: 13
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const {latitude, longitude} = pos.coords;
        this.setState({
          startPos: [latitude, longitude],
          loadingGeolocation: false,
          zoom: 13
        });
      },
      (err) => {
        console.error(err);
        this.setState({
          startPos: [39.8145, -99.9946],
          loadingGeolocation: false,
          zoom: 3
        });
      }
    );
  }

  render() {
    const { dispatch, tracks, settings } = this.props;

    let markers = this.props.services.map((service) => {
      return (
        <Marker key={service._id} radius={10} position={service.location}
          onclick={() => {
            dispatch(selectMarker(service));
          }}
        />
      );
    });

    let alerts = this.props.alerts.map((alert) => {
      return (
        <Marker key={alert._id} radius={10} position={alert.location}
          onclick={() => {
            dispatch(selectMarker(alert));
          }}
        />
      );
    });

    // Display waypoints for active tracks
    const activeTracks = values(tracks).filter(track => track.active)
    const trackViews = activeTracks.map(track => {
        return (
          <MultiPolyline key={track._id} polylines={track.waypoints}
            color="#f30" opacity="0.8" />
        )
      });

    // If offline, display tile layers for tracks with available packages
    const availableTracks = values(tracks)
      .filter(track => track.status === 'available');

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
    if(settings.onlineMode) {
      tileLayer = (
        <TileLayer
          url={tileLayerInfo.url}
          attribution={tileLayerInfo.attr} />
      );
    } else if(availableTracks.length > 0) {
      const pkg = availableTracks[0].pkg;
      tileLayer = (
        <MBTilesLayer
          pkg={pkg}
          url={tileLayerInfo.url}
          attribution={tileLayerInfo.attr} />
      );
    }

    let view;
    if (this.state.loadingGeolocation) {
      view = <div style={{margin:'auto'}}>
        <Spinner singleColor />
      </div>;
    } else {
      view = <Map
          center={this.state.startPos}
          zoom={this.state.zoom}
          onclick={() => {
            dispatch(deselectMarker());
        }}
      >
        <CircleMarker center={this.state.startPos} />
        { tileLayer }

        { markers }
        { alerts }
        { trackViews }
      </Map>;
    }

    return view;
  }
}

function select(state) {
  return {
    tracks: state.tracks.toJS(),
    settings: state.settings.toJS()
  };
}
export default connect(select)(PointMap);
