import React, {Component} from 'react';

// import leaflet components
import * as leaflet from 'react-leaflet';
let {Marker, Popup, Map, TileLayer, CircleMarker, MultiPolyline} = leaflet;
import { usbr20 } from '../mock-route';

leaflet.setIconDefaultImagePath('img/icons');

// import redux components
import { connect } from 'react-redux';
import { selectMarker, deselectMarker } from '../actions/map_actions';

import { Spinner, CardText } from 'react-mdl';

class PointMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startPos:[0,0],
      loadingGeolocation: true,
      zoom: 13
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const {latitude, longitude} = pos.coords;
        this.setState({
          startPos: [latitude, longitude],
          loadingGeolocation: false,
          zoom: 13
        });
      },
      (err) => {
        console.error(err);
        this.setState({
          startPos: [39.8145, -99.9946],
          loadingGeolocation: false,
          zoom: 3
        });
      }
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

    const tileLayerInfo = {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attr: `&copy; <a href="http://osm.org/copyright">
              OpenStreetMap</a>contributors`
    }

    let view;
    if (this.state.loadingGeolocation) {
      view = <div style={{margin:'auto'}}>
        <Spinner singleColor />
      </div>;
    } else {
      view = <Map
          center={this.state.startPos}
          zoom={this.state.zoom}
          onclick={() => {
            dispatch(deselectMarker());
        }}
      >
        <CircleMarker center={this.state.startPos} />
        <TileLayer
          url={tileLayerInfo.url}
          attribution={tileLayerInfo.attr}
        />

        { markers }
        { alerts }

        <MultiPolyline polylines={usbr20}
                  color="#f30"
                  opacity="0.8"
                  />
      </Map>;
    }

    return view;
  }
}

export default connect()(PointMap);
