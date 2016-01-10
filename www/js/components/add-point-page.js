import React, {Component} from 'react';

import { Layout, Header, Content } from 'react-mdl';
import ACDrawer from './ac-drawer';
import PointMap from './point-map';

// import redux components
import { connect } from 'react-redux';

import HammerPointCard from './hammer-point-card';

class AddPointPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Layout fixedHeader>
          <Header title="Adventure Cycling" />
          <ACDrawer page="Add Point"/>
        </Layout>
      </div>
    );
  }
}

export default AddPointPage;
