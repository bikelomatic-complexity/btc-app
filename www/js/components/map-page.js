import React, {Component} from 'react';

import { Layout, Header, Content } from 'react-mdl';
import ACDrawer from './ac-drawer';
import PointMap from './point-map';

// import redux components
import { connect } from 'react-redux';

import HammerPointCard from './hammer-point-card';

class MapPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { marker, services, alerts } = this.props;

    let selectedPoint;
    if(marker.selectedMarker) {
      selectedPoint = marker.selectedMarker;
    } else if(services.length > 0) {
      selectedPoint = services[0];
    }

    let pointCard;
    if(selectedPoint) {
      pointCard = (
        <HammerPointCard point={selectedPoint} show={marker.showPointCard} />
      );
    }

    return (
      <Layout fixedHeader>
        <Header title="Adventure Cycling" />
        <ACDrawer page="Map"/>
        <PointMap services={services} alerts={alerts} />
        {pointCard}
      </Layout>
    );
  }
}

function select(state) {
  return {
    marker: state.marker,
    services: state.points,
    alerts: [],
  };
}

export default connect(select)(MapPage);
