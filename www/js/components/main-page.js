import React, {Component} from 'react';
import { render } from 'react-dom';

import { Layout, Header, Drawer, Navigation, Content } from 'react-mdl';
import MyMap from './my-map';

// import redux components
import { connect } from 'react-redux';

import PointCard from './point-card';

class MainPage extends Component {
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
          <Drawer title="Menu">
            <Navigation>
              <a href="">Services</a>
              <a href="">Points of Interest</a>
              <a href="">Alerts</a>
              <a href="">Filter</a>
            </Navigation>
          </Drawer>
          <MyMap services={this.props.services}/>
          <PointCard point={selectedPoint} show={marker.showCard}/>
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

export default connect(select)(MainPage);
