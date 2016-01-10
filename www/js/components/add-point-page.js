import React, {Component} from 'react';

import { Layout, Header, Content, Button } from 'react-mdl';
import ACDrawer from './ac-drawer';
import PointMap from './point-map';
import AddPointCard from './add-point-card';

// import leaflet components
import { Marker, Popup, Map, TileLayer } from 'react-leaflet';

// import redux components
import { connect } from 'react-redux';

import HammerPointCard from './hammer-point-card';

class AddPointPage extends Component {
  constructor(props) {
    super(props);
    this.state = {center: [43.0830, -77.6722]};
  }

  onMapMoved(e) {
    this.setState({center: e.target.getCenter()});
    console.log(e.target.getCenter());
  }

  render() {
    let centerPos = [43.0830, -77.6722];
    return (
      <div className="adding-point">
        <Layout fixedHeader>
          <Header title="Choose a Location"/>
          <ACDrawer page="Add Point"/>

          <Map center={centerPos} zoom={13} onLeafletDrag={this.onMapMoved.bind(this)}>
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={this.state.center} radius={10}/>
          </Map>

          <AddPointCard />
        </Layout>
      </div>
    );
  }
}

export default AddPointPage;
