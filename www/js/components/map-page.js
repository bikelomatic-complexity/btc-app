import React, {Component} from 'react';

import { Layout, Header, Content } from 'react-mdl';
import ACDrawer from './ac-drawer';
import PointMap from './point-map';

// import library for handling image blobs
import BlobUtil from 'blob-util'

// import redux components
import { connect } from 'react-redux';

// import pouch library
import {pluck} from 'underscore';

import HammerPointCard from './hammer-point-card';

class MapPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { marker, services, alerts } = this.props;
    let selectedPoint = services[0];
    let imageSrc;
    // if we selected a new marker, set it to the selected point
    if (marker.selectedMarker) {
      selectedPoint = marker.selectedMarker;
      // if we have an image, load the image using the BlobUtil library
      if (marker.selectedMarker.imageBlob) {
        imageSrc = BlobUtil.createObjectURL(marker.selectedMarker.imageBlob);
      }
      selectedPoint = Object.assign(marker.selectedMarker, {imageSrc});
    }

    return (
      <Layout fixedHeader>
        <Header title="Adventure Cycling" />
        <ACDrawer page="Map"/>
        <PointMap services={services} alerts={alerts}/>
        <HammerPointCard point={selectedPoint} show={marker.showPointCard}/>
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

export default connect(select)(MapPage);
