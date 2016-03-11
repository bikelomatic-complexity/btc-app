/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';

import ConnectedPointMap from '../../containers/connected-point-map';
/*eslint-enable no-unused-vars*/

import WizardPage from './wizard-page';
import { bindAll } from 'lodash';

import '../../../css/map.css';
import '../../../css/wizard.css';

export class AddPointLocation extends WizardPage {
  constructor(props) {
    super(props);
    bindAll(this, 'updateLocation');
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

  getPageContent() {
    const {services, alerts, tracks, mapState, setMapCenter, filters, settings, setGeoLocation, setMapZoom, setMapLoading} = this.props;

    const styleShadow = { marginLeft: '4px', marginTop: '18px', width: '25px', height: '41px' };
    const styleMarker = { marginLeft: '0px', marginTop: '18px', height: '41px' };

    // The parent div has no styling as both children are absolutely positioned
    return (
      <div>
        <ConnectedPointMap className="map map--wizard-mode"
          afterMoved={ this.updateLocation } />
        <div className="crosshairs">
          <div className="crosshairs__shadow" />
          <div className="crosshairs__marker" />
        </div>
      </div>
    );

    // <div className='adding-point' style={ { position: 'fixed', top: 'calc(50% + 45px)', right: 'calc(50% - 12.5px)' } }>
    //   <img src='img/icons/marker-shadow.png'
    //     className='leaflet-marker-shadow'
    //     style={ styleShadow } />
    //   <img src='img/icons/marker-icon.png'
    //     className='marker'
    //     style={ styleMarker } />
    // </div>
  }

  getTransition() {
    return WizardPage.transitions.next;
  }
}

export default AddPointLocation;
