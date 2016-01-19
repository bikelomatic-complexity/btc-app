import React, {Component} from 'react';

import { Layout, Header, Content, Button } from 'react-mdl';
import ACDrawer from './ac-drawer';
import PointMap from './point-map';
import AddPointCard from './add-point-card';

// import leaflet components
import { Marker, Map, TileLayer } from 'react-leaflet';

export class AddPointPage extends Component {
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
        const {latitude, longitude} = pos.coords;
        this.setState({startCenter:[latitude, longitude]});
        this.setState({center:{lat:latitude, lng:longitude}});
      },
      (err) => {console.error(err)}
    );
  }

  render() {

    const tileLayerInfo = {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attr: `&copy; <a href="http://osm.org/copyright">
              OpenStreetMap</a>contributors`
    }
    return (
      <Layout fixedHeader>
        <Header title="Choose a Location"/>
        <ACDrawer page="Add Point"/>

        <Map  className="adding-point"
              center={this.state.startCenter} zoom={13}
              onLeafletDrag={this.onMapMoved.bind(this)}>
          <TileLayer
            url={tileLayerInfo.url}
            attribution={tileLayerInfo.attr}
          />
          <Marker position={this.state.center} radius={10}/>
        </Map>

        <AddPointCard {...this.props } latlng={this.state.center} />
      </Layout>
    );
  }
}

export default AddPointPage;
