import React, {Component} from 'react';

// import leaflet components
import * as leaflet from 'react-leaflet';
let { Marker, Popup, Map, TileLayer, CircleMarker, MultiPolyline } = leaflet;
import { divIcon } from 'leaflet';
import { usbr20 } from '../mock-route';

leaflet.setIconDefaultImagePath('img/icons');

// import redux components
import { connect } from 'react-redux';
import { selectMarker, deselectMarker, setMapCenter, setGeoLocation, setMapZoom, setMapLoading } from '../actions/map-actions';

import { Spinner, CardText } from 'react-mdl';

const usbr20_low = usbr20.map((track)=>{
  return track.filter((point, index)=>{
    return index % 100 == 0;
  });
});

const customIcon = divIcon({
  className:'adding-point',
  html:`<img src="img/icons/marker-shadow.png" class="leaflet-marker-shadow" style="margin-left: -12px; margin-top: -31px; width: 41px; height: 41px;">
  <img src="img/icons/marker-icon.png" class="marker" tabindex="0" style="margin-left: -12px; margin-top: -41px; width: 25px; height: 41px;">`
});

class PointMap extends Component {
  constructor(props) {
    super(props);
    const { mapReducer } = this.props;
    this.state = {
      startCenter: mapReducer.center,
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
          const coords = [latitude, longitude];
          dispatch(setGeoLocation(coords));
          dispatch(setMapCenter(coords));
          dispatch(setMapLoading(false));
          this.setState({
            startCenter: coords,
            center:coords,
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
    dispatch(setMapZoom(this.state.zoom));
    dispatch(setMapCenter(this.state.center));
  }

  onMapMove(leaflet) {
    const { dispatch } = this.props;
    const { lat, lng } = leaflet.target.getCenter();
    this.setState({center:[lat, lng]});
  }

  onMapMoved(leaflet) {
    const { dispatch } = this.props;
    const { lat, lng } = leaflet.target.getCenter();
    this.setState({zoom:leaflet.target.getZoom(), center:[lat, lng]});
    dispatch(setMapCenter(this.state.center));
  }

  render() {
    const { dispatch, mapReducer } = this.props;
    let markers = this.props.services.map((service) => {
      return (
        <Marker key={service._id} radius={10} position={service.location}
          onclick={() => {
            if (!this.props.addpoint){
              dispatch(selectMarker(service));
            }
          }}
        />
      );
    });

    let alerts = this.props.alerts.map((alert) => {
      return (
        <Marker key={alert._id} radius={10} position={alert.location}
          onclick={() => {
            if (!this.props.addpoint){
              dispatch(selectMarker(alert));
            }
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

    let addpoint = '';
    if (this.props.addpoint) {
      addpoint = <Marker  position={this.state.center}
                          radius={10}
                          icon={customIcon} />
    }

    let onLeafletMove = ()=>{};
    if (this.props.watchOnMove) {
      onLeafletMove = function(leafletMap){
        this.onMapMove(leafletMap);
      }.bind(this);
    }

    let view;
    if (mapReducer.loading) {
      view = <div style={{margin:'auto'}}>
        <Spinner singleColor />
      </div>;
    } else {
      view = (
        <Map  center={this.state.startCenter} zoom={this.state.zoom}
              onLeafletMove={onLeafletMove}
              onLeafletMoveEnd={(leafletMap)=>{
                this.onMapMoved(leafletMap);
              }}
              onclick={() => {
                dispatch(deselectMarker());
              }} >

          { circleMarker }

          <TileLayer url={tileLayerInfo.url} attribution={tileLayerInfo.attr} />

          { markers }
          { alerts }

          <MultiPolyline  polylines={usbr20_low}
                          color="#f30"
                          opacity="0.8"/>

          { addpoint }

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
