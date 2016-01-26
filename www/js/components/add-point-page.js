import React, {Component} from 'react';

import * as leaflet from 'react-leaflet';
import { divIcon } from 'leaflet';

import { Layout, Header, Content, Button } from 'react-mdl';
import ACDrawer from './ac-drawer';
import PointMap from './point-map';
import AddPointCard from './add-point-card';

// import redux components
import { connect } from 'react-redux';

// import leaflet components
import { Marker, Map, TileLayer } from 'react-leaflet';

const customIcon = divIcon({
  className:'adding-point',
  html:`<img src="img/icons/marker-shadow.png" class="leaflet-marker-shadow" style="margin-left: -17px; margin-top: -36px; width: 41px; height: 41px;">
  <img src="img/icons/marker-icon.png" class="marker" tabindex="0" style="margin-left: -18px; margin-top: -31px; width: 25px; height: 41px;">`
});

export class AddPointPage extends Component {
  constructor(props) {
    super(props);
    this.state = {startCenter: [0,0], center: [0, 0]};
  }

  updateMarker(leafletMap){
    const { lat, lng } = leafletMap.target.getCenter();
    this.setState({center:[lat, lng]})
    // console.log(lat, lng)
  }

  render() {
    const { marker, services, alerts, mapState } = this.props;

    return (
      <Layout fixedHeader>
        <Header title="Choose a Location"/>
        <ACDrawer page="Add Point"/>
        <PointMap services={services}
                  alerts={alerts}
                  onLeafletMove={this.updateMarker.bind(this)}>
          <Marker position={this.state.center} radius={10} icon={customIcon} />
        </PointMap>
        <AddPointCard history={this.props.history} center={mapState.center}/>
      </Layout>
    );
  }
}

function select(state) {
  return {
    marker: state.marker,
    services: state.points,
    alerts: [],
    mapState: state.mapState
  };
}

export default connect(select)(AddPointPage);
