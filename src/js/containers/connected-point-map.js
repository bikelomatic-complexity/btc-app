/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import PointMap from '../components/point-map';
/*eslint-enable no-unused-vars*/

import * as mapActions from '../reducers/map';

import { pick, values } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
        { ...this.props.pointMap }
        { ...this.props.pointMapActions } />
      );
  }
}

function mapStateToProps( state ) {
  return {
    pointMap: {
      points: values( state.points ),
      tracks: state.tracks.toJS(),
      settings: state.settings.toJS(),
      map: state.map,
      filters: state.filters
    }
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    pointMapActions: bindActionCreators( mapActions, dispatch )
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( ConnectedPointMap );
