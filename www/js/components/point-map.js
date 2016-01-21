import React, {Component} from 'react';

// import leaflet components
import * as leaflet from 'react-leaflet';
let {Marker, Popup, Map, TileLayer, CircleMarker, MultiPolyline} = leaflet;
import { usbr20 } from '../mock-route';

leaflet.setIconDefaultImagePath('img/icons');

// import redux components
import { connect } from 'react-redux';
import { selectMarker, deselectMarker, setMapCenter, setGeoLocation, setMapZoom, setMapLoading } from '../actions/map-actions';

import { Spinner, CardText } from 'react-mdl';

class PointMap extends Component {
  constructor(props) {
    super(props);
    const { mapReducer } = this.props;
    this.state = {
      center: mapReducer.center,
      zoom: mapReducer.zoom
    }
  }

  componentDidMount() {
    const { dispatch, mapReducer } = this.props;
    if (mapReducer.loading) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const {latitude, longitude} = pos.coords;
          dispatch(setGeoLocation([latitude, longitude]));
          dispatch(setMapLoading(false));
          this.setState({
            center:[latitude, longitude],
            zoom:13
          });
        },
        (err) => {
          console.error(err);
          dispatch(setMapLoading(false));
        }
      )
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(setMapCenter(this.state.center));
    dispatch(setMapZoom(this.state.zoom));
  }

  onMapMoved(e) {
    this.setState({center: e.target.getCenter()});
  }

  render() {
    const { dispatch, mapReducer } = this.props;
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

    const { children } = this.props;

    let circleMarker = '';
    if (mapReducer.geolocation) {
      circleMarker = <CircleMarker center={mapReducer.geolocation} />
    }

    let view;
    let addCenter;
    if (mapReducer.loading) {
      view = <div style={{margin:'auto'}}>
        <Spinner singleColor />
      </div>;
    } else {
      view = (
        <Map  center={mapReducer.center} zoom={this.state.zoom}
              onLeafletDrag={leafletMap=>{
                this.setState({center:leafletMap.target.getCenter()});
              }}
              onLeafletDragEnd={leafletMap=>{
                this.setState({center:leafletMap.target.getCenter()});
              }}
              onclick={() => {
                dispatch(deselectMarker());
              }} >

          { circleMarker }

          <TileLayer url={tileLayerInfo.url} attribution={tileLayerInfo.attr} />

          { markers }
          { alerts }

          <MultiPolyline  polylines={usbr20}
                          color="#f30"
                          opacity="0.8"/>

          { this.props.addMarker ? <Marker  className="adding-point"
                                            position={this.state.center}
                                            radius={10}/> : '' }

        </Map>);
    }

    return view;
  }
}

function select(state) {
  return {
    mapReducer: state.mapReducer
  };
}

export default connect(select)(PointMap);
