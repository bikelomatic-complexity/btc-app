import React, {Component} from 'react';

import { Layout, Header, Content } from 'react-mdl';
import ACDrawer from './ac-drawer';
import MyMap from './my-map';

// import redux components
import { connect } from 'react-redux';

import HammerPointCard from './hammer-point-card';

class MapPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { marker } = this.props;
    let selectedPoint = this.props.services[0];
    if (marker.selectedMarker) {
      selectedPoint = marker.selectedMarker;
    }

    return (
      <div>
        <Layout fixedHeader>
          <Header title="Adventure Cycling" />
          <ACDrawer page="Map"/>
          <MyMap services={this.props.services} alerts={this.props.alerts}/>
          <HammerPointCard point={selectedPoint} show={marker.showPointCard}/>
        </Layout>
      </div>
    );
  }
}

function select(state) {
  return {
    marker: state.marker
  };
}

export default connect(select)(MapPage);
