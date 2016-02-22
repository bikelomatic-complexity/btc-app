import React, {Component} from 'react';

import { Paper } from 'material-ui';

// import redux components
import { connect } from 'react-redux';

import { selectMarker, setMapCenter, setGeoLocation,
  setMapZoom, setMapLoading } from '../actions/map-actions';

import PointMap from '../components/point-map';

class MapPage extends Component {

  componentDidMount() {
    // set the drawer title
    const { setDrawer, marker } = this.props;
    setDrawer('Map');

    // set the current point (if we got it from a URL param)
    // const { dispatch } = this.props;
    // const { pointId } = this.props.params;
    // dispatch(selectMarker(pointId));
  }

  render() {
    const { dispatch, marker, services, alerts,
            tracks, settings, mapState, filters} = this.props;

    // add props and actions so the component can dispatch actions
    const pointChildren = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        point: marker,
        heightOffset: 0,
        fullscreenMarker: () => {
          // dispatch(fullscreenMarker());
          this.props.history.push('/view-point');
        },
        peekMarker: () => {
          // dispatch(peekMarker());
          this.props.history.push('/peek-point');
        },
        deselectMarker: () => {
          // dispatch(deselectMarker());
          this.props.history.push('/');
        },
      });
    });

    return (
      <div className="page-content">
        <PointMap services={services} alerts={alerts}
                  tracks={tracks} settings={settings}
                  mapState={mapState} filters={filters}
          selectMarker={point => {
            dispatch(selectMarker(point));
            this.props.history.push('/peek-point');
          }}
          deselectMarker={() => {
            // dispatch(deselectMarker());
            this.props.history.push('/');
          }}
          setMapCenter={coords => {dispatch(setMapCenter(coords))}}
          setGeoLocation={coords => {dispatch(setGeoLocation(coords))}}
          setMapZoom={zoom => {dispatch(setMapZoom(zoom))}}
          setMapLoading={isLoading => {dispatch(setMapLoading(isLoading))}}
        />
        {pointChildren}
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
