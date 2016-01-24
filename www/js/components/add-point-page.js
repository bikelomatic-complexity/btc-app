import React, {Component} from 'react';

import { Layout, Header, Content, Button } from 'react-mdl';
import ACDrawer from './ac-drawer';
import PointMap from './point-map';
import AddPointCard from './add-point-card';

// import redux components
import { connect } from 'react-redux';

// import leaflet components
import { Marker, Map, TileLayer } from 'react-leaflet';

export class AddPointPage extends Component {
  constructor(props) {
    super(props);
    this.state = {startCenter: [0,0], center: {lat:0, lng:0}};
  }

  onMapMoved(e) {
    this.setState({center: e.target.getCenter()});
  }

  render() {
    const { marker, services, alerts } = this.props;

    return (
      <Layout fixedHeader>
        <Header title="Choose a Location"/>
        <ACDrawer page="Add Point"/>
        <PointMap addpoint services={services} alerts={alerts}/>
        <AddPointCard history={this.props.history}/>
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

export default connect(select)(AddPointPage);
