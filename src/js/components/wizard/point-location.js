/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';

import ConnectedPointMap from '../../containers/connected-point-map';
/*eslint-enable no-unused-vars*/

import WizardPage from './wizard-page';
import { bindAll } from 'lodash';

import '../../../css/map.css';
import '../../../css/wizard.css';

export class PointLocation extends WizardPage {
  constructor( props ) {
    super( props );
    bindAll( this, 'updateLocation' );
  }

  updateLocation( leaflet ) {
    const {setPointLocation} = this.props;
    const {lat, lng} = leaflet.target.getCenter();
    setPointLocation( [ lat, lng ] );
  }

  componentDidMount() {
    const {setPointLocation, mapState, setDrawer} = this.props;
    setPointLocation( mapState.center );
    setDrawer( 'Pick a Location' );
  }

  // The parent div has no styling as both children are absolutely positioned
  getPageContent() {
    return (
      <div>
        <ConnectedPointMap addPoint
          className="map map--wizard-mode"
          afterMoved={ this.updateLocation } />
        <div className="crosshairs">
          <div className="crosshairs__shadow" />
          <div className="crosshairs__marker" />
        </div>
      </div>
      );
  }

  getPreferredTransition() {
    return WizardPage.transitions.next;
  }
}

export default PointLocation;
