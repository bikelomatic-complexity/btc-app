import React, {Component} from 'react';

import { Layout, Header, Content } from 'react-mdl';
import ACDrawer from './ac-drawer';
import PointMap from './point-map';

// import redux components
import { connect } from 'react-redux';

// import pouch library
import ACPouch from '../ac-pouch';
import {pluck} from 'underscore';
import { alerts, services } from '../mock-data'

import HammerPointCard from './hammer-point-card';

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        alerts : alerts,
        services: services
      };

  }

  componentDidMount() {
    let pouch = new ACPouch();
    pouch.getPoints().query('points/all_points', {
      include_docs: true
    }).then(result => {
      this.setState({services: pluck(result.rows, 'doc')});
    });
  }

  render() {
    const { marker } = this.props;
    let selectedPoint = this.state.services[0];
    if (marker.selectedMarker) {
      selectedPoint = marker.selectedMarker;
    }

    return (
      <Layout fixedHeader>
        <Header title="Adventure Cycling" />
        <ACDrawer page="Map"/>
        <PointMap services={this.state.services} alerts={this.state.alerts}/>
        <HammerPointCard point={selectedPoint} show={marker.showPointCard}/>
      </Layout>
    );
  }
}

function select(state) {
  return {
    marker: state.marker
  };
}

export default connect(select)(MapPage);
