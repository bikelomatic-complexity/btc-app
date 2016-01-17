import React, {Component} from 'react';

// import leaflet components
import * as leaflet from 'react-leaflet';
let {Marker, Popup, Map, TileLayer} = leaflet;

leaflet.setIconDefaultImagePath('img/icons');

// import redux components
import { connect } from 'react-redux';
import { selectMarker, deselectMarker } from '../actions/map_actions';

class PointMap extends Component {
  constructor(props) {
    super(props);
    this.state = {startPos:[0,0]};
  }


  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {this.setState({startPos:[pos.coords.latitude, pos.coords.longitude]});},
      (err) => {console.log(err)}
    );
  }

  render() {
    const { dispatch } = this.props;
    let markers = this.props.services.map((service) => {
      return (
        <Marker key={service._id} radius={10} position={service.location}
          onclick={() => {
            dispatch(selectMarker(service));
          }}
        />
      );
    });

    let alerts = this.props.alerts.map((alert) => {
      return (
        <Marker key={alert._id} radius={10} position={alert.location}
          onclick={() => {
            dispatch(selectMarker(alert));
          }}
        />
      );
    });

    return (
      <Map center={this.state.startPos} zoom={13}
        onclick={() => {
          dispatch(deselectMarker());
        }}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        { markers }
        { alerts }
      </Map>
    );
  }
}

export default connect()(PointMap);
