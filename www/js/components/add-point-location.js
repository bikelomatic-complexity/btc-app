/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';

import PointMap from './point-map';
/*eslint-enable no-unused-vars*/

export class AddPointLocation extends Component {

  updateLocation( leaflet ) {
    const {setPointLocation} = this.props;
    const {lat, lng} = leaflet.target.getCenter();
    setPointLocation( [ lat, lng ] );
  }

  updateLocationCoords( coords ) {
    const {setPointLocation} = this.props;
    setPointLocation( coords );
  }

  componentDidMount() {
    const {setPointLocation, mapState, setDrawer} = this.props;
    setPointLocation( mapState.center );
    setDrawer( 'Pick a Location' );
  }

  render() {
    const {services, alerts, tracks, mapState, setMapCenter, filters, settings, setGeoLocation, setMapZoom, setMapLoading} = this.props;

    const styleShadow = { marginLeft: '4px', marginTop: '18px', width: '25px', height: '41px' };
    const styleMarker = { marginLeft: '0px', marginTop: '18px', height: '41px' };

    const layoutStyle = { position: 'absolute', width: '100%', height: 'calc(100% - 0px)' };

    return (
      <div className='hideZoomControl'
        style={ layoutStyle }>
        <PointMap services={ services }
          alerts={ alerts }
          filters={ filters }
          mapState={ mapState }
          tracks={ tracks }
          settings={ settings }
          afterMoved={ this.updateLocation.bind( this ) }
          setMapCenter={ setMapCenter }
          setGeoLocation={ setGeoLocation }
          setMapZoom={ setMapZoom }
          setMapLoading={ setMapLoading } />
        <div className='adding-point'
          style={ { position: 'fixed', top: 'calc(50% + 45px)', right: 'calc(50% - 12.5px)' } }>
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
}

export default AddPointLocation;
