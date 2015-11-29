import React, {Component} from 'react';

// import leaflet components
import * as leaflet from 'react-leaflet';
let {Marker, Popup, Map, TileLayer} = leaflet;

leaflet.setIconDefaultImagePath('img/icons');

// import redux components
import { connect } from 'react-redux';
import {selectMarker, deselectMarker} from '../actions/actions';

class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { dispatch } = this.props;
    let markers = this.props.services.map((service) => {
      return (
        <Marker key={service._id} radius={10} position={[service.lat, service.lon]}
          onclick={() => {
            dispatch(selectMarker(service));
          }}
        />
      );
    });
    let first = this.props.services[0];
    let position = [first.lat, first.lon];

    return (
      <Map center={position} zoom={13}
        onclick={() => {
          dispatch(deselectMarker());
        }}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        { markers }
      </Map>
    );
  }
}

export default connect()(MyMap);
