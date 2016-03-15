/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';

import PointMap from '../components/point-map';
/*eslint-enable no-unused-vars*/

import { pick } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { setMapCenter, setGeoLocation, setMapZoom, setMapLoading } from '../actions/map-actions';

// The ConnectedPointMap connects Redux to the PointMap
//
// We transfer three groups of props to the PointMap
//  1. Plain props we want to transfer from ConnectedPointMap
//  2. Redux state from `mapStateToProps`
//  3. Redux actions from `mapDispatchToProps`
export class ConnectedPointMap extends Component {
  render() {
    const props = pick( this.props, [
      'selectMarker',
      'deselectMarker',
      'afterMoved',
      'className',
      'addPoint'
    ] );
    return (
      <PointMap { ...props }
        { ...this.props.pointMapState }
        { ...this.props.pointMapActions } />
    );
  }
}

function mapStateToProps( state ) {
  return {
    pointMapState: {
      services: state.points,
      alerts: [],
      tracks: state.tracks.toJS(),
      settings: state.settings.toJS(),
      mapState: state.mapState,
      filters: state.filters
    }
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    pointMapActions: bindActionCreators( {
      'setMapCenter': setMapCenter,
      'setGeoLocation': setGeoLocation,
      'setMapZoom': setMapZoom,
      'setMapLoading': setMapLoading
    }, dispatch )
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( ConnectedPointMap );
