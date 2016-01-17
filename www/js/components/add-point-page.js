import React, {Component} from 'react';

import { Layout, Header, Content, Button } from 'react-mdl';
import ACDrawer from './ac-drawer';
import PointMap from './point-map';
import AddPointCard from './add-point-card';

// import leaflet components
import { Marker, Map, TileLayer } from 'react-leaflet';

class AddPointPage extends Component {
  constructor(props) {
    super(props);
    this.state = {startCenter: [0,0], center: {lat:0, lng:0}};
  }

  onMapMoved(e) {
    this.setState({center: e.target.getCenter()});
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.setState({startCenter:[pos.coords.latitude, pos.coords.longitude]});
        this.setState({center:{lat:pos.coords.latitude, lng:pos.coords.longitude}});
        },
      (err) => {console.log(err)}
    );
  }

  render() {

    return (
      <Layout fixedHeader>
        <Header title="Choose a Location"/>
        <ACDrawer page="Add Point"/>

        <Map  className="adding-point"
              center={this.state.startCenter} zoom={13}
              onLeafletDrag={this.onMapMoved.bind(this)}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={this.state.center} radius={10}/>
        </Map>

        <AddPointCard latlng={this.state.center} />
      </Layout>
    );
  }
}

export default AddPointPage;
