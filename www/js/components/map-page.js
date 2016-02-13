import React, {Component} from 'react';

import PointMap from './point-map';
import { Paper } from 'material-ui';

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
    } else {
      selectedPoint = { };
    }

    let pointCard;
    if(selectedPoint) {
      pointCard = (
        <HammerPointCard point={selectedPoint} show={marker.showPointCard} />
      );
    }

    return (
      <div className="page-content">
        <PointMap services={services} alerts={alerts} />
        {pointCard}
      </div>
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
