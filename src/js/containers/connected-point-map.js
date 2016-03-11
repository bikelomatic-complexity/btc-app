/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';

import PointMap from '../components/point-map';
/*eslint-enable no-unused-vars*/

import { pick } from 'lodash';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { setMapCenter, setGeoLocation, setMapZoom, setMapLoading } from '../actions/map-actions';

export class ConnectedPointMap extends Component {
  render() {
    const optionalProps = pick( this.props, [
      'selectMarker',
      'deselectMarker',
      'afterMoved',
      'className'
    ] );
    const requiredProps = pick( this.props, [
      'setMapCenter',
      'setGeoLocation',
      'setMapZoom',
      'setMapLoading'
    ] );

    return (
      <PointMap { ...this.props.dependencies }
        { ...optionalProps }
        { ...requiredProps } />
    );
  }
}
ConnectedPointMap.defaultProps = {
  hideZoomControl: false
};

function select( state ) {
  return {
    dependencies: {
      services: state.points,
      alerts: [],
      tracks: state.tracks.toJS(),
      settings: state.settings.toJS(),
      mapState: state.mapState,
      filters: state.filters
    }
  }
}

const actions = { setMapCenter, setGeoLocation, setMapZoom, setMapLoading };

export default connect( select, actions )( ConnectedPointMap );
