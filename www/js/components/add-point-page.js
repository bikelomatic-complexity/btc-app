import React, {Component} from 'react';

import * as leaflet from 'react-leaflet';
import { divIcon } from 'leaflet';

import { Layout, Header, Content, Button } from 'react-mdl';
import ACDrawer from './ac-drawer';

// import redux components
import { connect } from 'react-redux';

export class AddPointPage extends Component {

  render() {

    return (
      <Layout fixedHeader>
        <Header title="Add New Point"/>
        <ACDrawer page="Add Point"/>
        <div className="flex-row">
          <Button raised accent ripple
            onClick={()=>{this.props.history.push('/add-point');}}>
            Location
          </Button>
          <Button raised accent ripple
            onClick={()=>{this.props.history.push('/add-point/name');}}>
            Name
          </Button>
          <Button raised accent ripple
            onClick={()=>{this.props.history.push('/add-point/description');}}>
            Description
          </Button>
          <Button raised accent ripple
            onClick={()=>{this.props.history.push('/add-point/hours');}}>
            Hours
          </Button>
          <Button raised accent ripple
            onClick={()=>{this.props.history.push('/add-point/amenities');}}>
            Amenities
          </Button>
        </div>

        <div>
          {this.props.children}
        </div>
      </Layout>
    );
  }
}

function select(state) {
  return {
    marker: state.marker,
    services: state.points,
    alerts: [],
    mapState: state.mapState
  };
}

export default connect(select)(AddPointPage);
