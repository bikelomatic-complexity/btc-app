import React, {Component} from 'react';
import { render } from 'react-dom';

import * as leaflet from 'react-leaflet';
let {Marker, Popup, Map, TileLayer} = leaflet;

leaflet.setIconDefaultImagePath('img/icons');

import PointCard from './point-card';

export default class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  showCard(service) {
    document.getElementById('mdl-map-card').style.bottom = '0px';
    this.setState({selectedPoint: service});
  }
  hideCard(evt) {
    document.getElementById('mdl-map-card').style.bottom = '-300px';
  }
  render() {
    let markers = this.props.services.map((service) => {
      return (
        <Marker key={service._id} radius={10} position={[service.lat, service.lon]} onclick={this.showCard.bind(this,service)} />
      );
    });
    let first = this.props.services[0];
    let position = [first.lat, first.lon];

    // create Point Card
    let pointCard = (<PointCard point={first}/>);
    if (this.state.selectedPoint) {
      pointCard = (<PointCard point={this.state.selectedPoint}/>);
    }

    return (
      <Map center={position} zoom={13} onclick={this.hideCard}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        { markers }
        { pointCard }
      </Map>
    );
  }
}
