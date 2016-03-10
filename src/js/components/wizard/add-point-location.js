/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';

import ConnectedPointMap from '../../containers/connected-point-map';
/*eslint-enable no-unused-vars*/

import WizardPage from './wizard-page';
import { bindAll } from 'lodash';

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

    const layoutStyle = { position: 'absolute', width: '100%', height: 'calc(100% - 0px)' };

    return (
      <div style={ layoutStyle } >
        <ConnectedPointMap hideZoomControl
          afterMoved={ this.updateLocation } />
        <div className='adding-point' style={ { position: 'fixed', top: 'calc(50% + 45px)', right: 'calc(50% - 12.5px)' } }>
          <img src='img/icons/marker-shadow.png'
            className='leaflet-marker-shadow'
            style={ styleShadow } />
          <img src='img/icons/marker-icon.png'
            className='marker'
            style={ styleMarker } />
        </div>
      </div>
    );
  }

  getTransition() {
    return WizardPage.transitions.next;
  }
}

export default AddPointLocation;
