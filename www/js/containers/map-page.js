import React, {Component} from 'react';

import { Paper } from 'material-ui';

// import redux components
import { connect } from 'react-redux';

import {  fullscreenMarker, peekMarker, deselectMarker,
  selectMarker, setMapCenter, setGeoLocation,
  setMapZoom, setMapLoading } from '../actions/map-actions';

import PointMap from '../components/point-map';
import HammerPointCard from '../components/hammer-point-card';

class MapPage extends Component {

  componentDidMount() {
    const { setDrawer } = this.props;
    setDrawer('Map');
  }

  render() {
    const { dispatch, marker, services, alerts,
            tracks, settings, mapState, filters} = this.props;

    let selectedPoint;
    if(marker.selectedMarker) {
      selectedPoint = marker.selectedMarker;
    } else if(services.length > 0) {
      selectedPoint = services[0];
    } else {
      selectedPoint = { };
    }

    let pointCard;
    if(selectedPoint) {
      pointCard = (
        <HammerPointCard point={selectedPoint} show={marker.showPointCard}
          fullscreenMarker={() => {dispatch(fullscreenMarker())}}
          peekMarker={() => {dispatch(peekMarker())}}
          deselectMarker={() => {dispatch(deselectMarker())}}
        />
      );
    }

    return (
      <div className="page-content">
        <PointMap services={services} alerts={alerts}
                  tracks={tracks} settings={settings}
                  mapState={mapState} filters={filters}
          selectMarker={point => {dispatch(selectMarker(point))}}
          deselectMarker={() => {dispatch(deselectMarker())}}
          setMapCenter={coords => {dispatch(setMapCenter(coords))}}
          setGeoLocation={coords => {dispatch(setGeoLocation(coords))}}
          setMapZoom={zoom => {dispatch(setMapZoom(zoom))}}
          setMapLoading={isLoading => {dispatch(setMapLoading(isLoading))}}
        />
        {pointCard}
      </div>
    );
  }
}

function select(state) {
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

export default connect(select)(MapPage);
