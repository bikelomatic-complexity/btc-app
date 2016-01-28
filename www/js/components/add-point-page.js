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

const styleShadow = {marginLeft: '4px', marginTop: '18px', width: '25px', height: '41px'}
const styleMarker = {marginLeft: '0px', marginTop: '18px', height: '41px'}

export class AddPointPage extends Component {
  constructor(props) {
    super(props);
    this.state = {location:[0,0]}
  }

  updateLocation(leaflet){
    const { lat, lng } = leaflet.target.getCenter();
    this.setState({location:[lat, lng]});
  }

  render() {
    const { marker, services, alerts, mapState } = this.props;

    return (
      <Layout fixedHeader>
        <Header title="Choose a Location"/>
        <ACDrawer page="Add Point"/>
        <PointMap services={services}
                  alerts={alerts}
                  afterMoved={this.updateLocation.bind(this)}/>
        <AddPointCard history={this.props.history} location={this.state.location}/>
        <div className="adding-point" style={{position:'fixed', top:'50%', right:'calc(50% - 12.5px)'}}>
          <img src="img/icons/marker-shadow.png" className="leaflet-marker-shadow" style={styleShadow}/>
          <img src="img/icons/marker-icon.png" className="marker" style={styleMarker}/>
        </div>
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
