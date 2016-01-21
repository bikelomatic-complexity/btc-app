import React, {Component} from 'react';

import { Layout, Header, Content, Button } from 'react-mdl';
import ACDrawer from './ac-drawer';
import PointMap from './point-map';
import AddPointCard from './add-point-card';

// import redux components
import { connect } from 'react-redux';

// import leaflet components
import { Marker, Map, TileLayer } from 'react-leaflet';

export class AddPointPage extends Component {
  constructor(props) {
    super(props);
    this.state = {startCenter: [0,0], center: {lat:0, lng:0}};
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
    const { marker, services, alerts } = this.props;

    // const tileLayerInfo = {
    //   url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    //   attr: `&copy; <a href="http://osm.org/copyright">
    //           OpenStreetMap</a>contributors`
    // }
    return (
      <Layout fixedHeader>
        <Header title="Choose a Location"/>
        <ACDrawer page="Add Point"/>
        {/*
        <Map  className="adding-point"
              center={this.state.startCenter} zoom={13}
              onLeafletDrag={this.onMapMoved.bind(this)}>
          <TileLayer
            url={tileLayerInfo.url}
            attribution={tileLayerInfo.attr}
          />

        </Map>
        */}
        <PointMap services={services}
                  alerts={alerts}
                  addMarker={true} />
        <AddPointCard history={this.props.history} latlng={this.state.center} />
      </Layout>
    );
  }
}

function select(state) {
  return {
    marker: state.marker,
    services: state.points,
    alerts: []
  };
}

export default connect(select)(AddPointPage);
